import { Pipe, PipeTransform } from '@angular/core';
import {Http} from '@angular/http';

@Pipe({
  name: 'toAddress'
})
export class ToAddressPipe implements PipeTransform {

  private url = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC89oGtrPh1Fqb3P7D-TyMSNRyYRSZoU3M&latlng=';
  private address;

  constructor(private http: Http) {

  }

  transform(value: any, args?: any): any {
    if (!value) {
      return null;
    }else {
      // console.log('transform');
      // let geocoder = new google.maps.Geo
      this.http.get(this.url + value.latest_location.geo_x + ',' + value.latest_location.geo_y)
      .map(result => result.json().results[0].formatted_address)
      .subscribe(result => {this.address = result; });
    return this.address;

    }
  }

}
// https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD3PRRjN1TXyhtE3M8nTf66NNWjGNrtIGA&latlng=1.406109,24.609375

