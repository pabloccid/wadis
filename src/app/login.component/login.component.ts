import {Component, ElementRef} from '@angular/core';
import {AuthenticationService, UserAuth} from '../authentication.service';


@Component({
    selector: 'app-login-form',
    providers: [AuthenticationService],
    template: `
        <br>
        <div class="container">
        <div class="row justify-content-center">
        <div class="col-md-4 col-sm-8 col-xs-12">
            <div class="card">
            <div class="card-header">
              <h4>Ingreso al sistema Wadis</h4>
            </div>
            <div class="card-block">
              <div class="row">
              <div class="input-field col s12">
                  <label for="username">Email</label>
                  <input [(ngModel)]="user.username" id="username"
                      type="email" class="validate form-control">
              </div>
          </div>

          <div class="row">
              <div class="input-field col s12">
                  <label for="password">Password</label>
                  <input [(ngModel)]="user.password" id="password"
                      type="password" class="validate form-control">
              </div>
          </div>
            <br>
          <div class="row">
            <div class="input-field col s12">
                <button (click)="login()"
                    class="btn btn-primary btn-lg"
                    type="submit" name="action">Ingresar</button>
                    <span>{{errorMsg}}</span>
                    </div>
                </div>
            </div>
          </div>
          </div></div>
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
