import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HTTP } from '@ionic-native/http';

/*
  Generated class for the Google provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoogleService  {

  constructor(
    public http: Http,
    public httpx: HTTP,
    ) {
    console.log('Start Google Provider');
  }
  
  getAddress(latLng) {
    let address = this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latLng.lat() + ',' + latLng.lng());
    return address;
  }

  getCoords(address) {
    let coords = this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address );
    return coords;
  }

  getLocation() {
    let location = this.http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBZBcA9sl890-ogezSTLJEj5ICTMxWOgc4', {});
    return location;
  }

}
