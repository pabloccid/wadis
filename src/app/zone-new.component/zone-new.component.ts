import { ListZoneComponent } from './../zone-list.component/zone-list.component';
import { Component } from '@angular/core';
import { Zone } from '../zone';
import { ZoneService } from '../zone.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';
import { Http } from '@angular/http';
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-zone-new',
  styleUrls: ['./zone-new.component.css'],
  templateUrl: 'zone-new.component.html',
  providers: [ZoneService]
})


export class NewZoneComponent implements OnInit {

  data: Zone;

  constructor(private zoneService: ZoneService, private router: Router, private _service: AuthenticationService) {

    this.router = router;
   }

   ngOnInit(): void {
    this._service.checkCredentials();
   }

  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.zoneService.create(name);
  this.router.navigateByUrl('/zonelist');
}
}
