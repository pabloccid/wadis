import {Component, ElementRef} from '@angular/core';
import {AuthenticationService, UserAuth} from '../authentication.service';


@Component({
    selector: 'app-login-form',
    providers: [AuthenticationService],
    template: `
        <div class="container" >
            <div class="title">
                Welcome
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="input-field col s12">
                        <input [(ngModel)]="user.username" id="username"
                            type="email" class="validate">
                        <label for="email">Usuario</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12">
                        <input [(ngModel)]="user.password" id="password"
                            type="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                </div>

                <span>{{errorMsg}}</span>
                <button (click)="login()"
                    class="btn waves-effect waves-light"
                    type="submit" name="action">Login</button>
            </div>
        </div>
    	`
})

export class LoginComponent {

    public user = new UserAuth('', '');
    public errorMsg = '';

    constructor(
        private _service: AuthenticationService) {}

    login() {
        if (!this._service.login(this.user)) {
            this.errorMsg = 'Failed to login';
        }

    }
}
