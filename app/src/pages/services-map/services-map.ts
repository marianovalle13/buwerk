import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { GoogleService } from '../../providers/google';
import { Geolocation } from '@ionic-native/geolocation';
import { Constants } from '../../app/app.constants';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

import { CitiesProvider } from "../../providers/cities/cities";
/**
 * Generated class for the PrestadoresMapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
declare var window: any;
var location: any;

@Component({
  selector: 'page-services-map',
  templateUrl: 'services-map.html',
  providers: [GoogleService, NativeGeocoder]
})
export class ServicesMapPage {

  public foundAddress;
  public markers = [];
  public loader: any;

  lastLocation: any = null;

  items: any;
  location: any;
  coords: any;
  title: string = "Servicios Cercanos"

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private googleService: GoogleService,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public nativeGeocoder: NativeGeocoder,
    public citiesProvider: CitiesProvider,
    public toastCtrl: ToastController
  ) {
    this.items = this.navParams.get('items');
    this.location = this.navParams.get('location');
    console.log('this.items ', this.items)
    console.log('this.location ', this.location)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestadoresMapaPage');

    if (this.items) {
      this.getLocation();
    } else {
      this.getCoords();
      this.title = "Ubicación del Servicio"
    }
  }

  getCoords() {

    this.presentLoader();

    console.log('get coords', this.location);
    console.log('get coords address', this.location.address);


    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    let filter = {
      city: this.location.city
    }

    this.citiesProvider.getById(this.location.city)
      .then(city => {
        console.log('city ', city);
        console.log('user.address ', this.location.address)



        let place;
        if (city) {
          place = city['name'] + ' ,' + this.location.address;
        } else {
          place = this.location.address;
        }

        console.log('place ', place)

        this.nativeGeocoder.forwardGeocode(place, options)
          .then((coordinates: NativeGeocoderForwardResult[]) => {
            console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude);

            let coords = { latitude: coordinates[0].latitude, longitude: coordinates[0].longitude }
            this.loadMap(coords);

          }).catch(error => {
            console.log('error ', error);
            this.dismissLoader();
            this.locationError('No hemos podido conectarnos con el servicio de Google Maps. Intente mas tarde');
          });

      })
      .catch(error => {
        console.log('error ', error);
        this.dismissLoader();
        this.locationError('No hemos acceder al servidor. Intente mas tarde');
      })
  }

  getLocation() {
    this.presentLoader();
    this.geolocation.getCurrentPosition().then((resp) => {
      let coords = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      }

      console.log('coords ', coords);

      this.loadMap(coords);

    }).catch((error) => {
      console.log('Error getting location', error);
      this.dismissLoader();
      this.locationError('No ha sido posible obtener tu ubicación. Es posible que debas habilitar el GPS desde Ajustes o que no tengas habilitado wifi/datos.');
    });
  }
  locationError(message) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'OK'
    });
    toast.present();
    this.navCtrl.pop();
  }

  locationErrorOri() {
    const toast = this.toastCtrl.create({
      message: 'No ha sido posible obtener tu ubicación. Es posible que debas habilitar el GPS desde Ajustes o que no tengas habilitado wifi/datos.',
      duration: 4000,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'OK'
    });
    toast.present();
    this.navCtrl.pop();
  }

  presentLoader() {
    this.loader = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    this.loader.present();
  }

  dismissLoader() {
    if (this.loader) {
      try{
        this.loader.dismiss();
      }catch(e){
        console.log(e);
      }
    }
  }

  loadMap(coords) {

    let latLng = new google.maps.LatLng(coords.latitude, coords.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      fullscreenControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      streetViewControl: false,
      mapTypeControl: false
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // let iconName = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    // let iconName = 'http://maps.google.com/mapfiles/kml/paddle/wht-circle.png';

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    console.log('map ready');
    this.dismissLoader();
    if (this.items) {
      this.showMarkers();
    }
  }

  setCenter() {
    if (this.lastLocation != null) {
      this.map.setCenter(this.lastLocation);
    }
  }

  showMarkers() {
    for (let item of this.items) {
      this.addMarker(item);
    }
  }
  addMarker(item) {

    console.log('item ', item);

    let myLatLng = { lat: item.latitude, lng: item.longitude };

    let iconName;

    switch (item.category) {
      case 'Hogar':
        iconName = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
        break;
      case 'Mantenimiento':
        iconName = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        break;
      case 'Jardinería':
        iconName = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        break;
      case 'Cuidados personales':
        iconName = 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png';
        break;
    }


    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: myLatLng,
      icon: iconName
    });

    // this.markers.push(marker);
    // console.log("Markers: " + this.markers);

    this.addInfoWindow(marker, item);

  }

  getImage(image) {
    let res;

    return res;
  }

  addInfoWindow(marker, item) {

    let image;
    if (item.image) {
      image = Constants.FILES_BASE_URL + "/" + item.image;
    }

    var contentString = `
    <div style="color:black;">
      <img style="border-radius: 50%;height: 5rem; width: 5rem; object-fit:cover" src='${image}' onError="this.src='assets/imgs/avatar.png'">
      <div style='float:left;'>
      </div>
      <div style='float:right; padding: 4px; padding-top: 0; width: 10rem; padding-left: 10px'>
        <b>${item.name}</b>
        <br/>
      ${item.shortDesc}
        <br/>
      </div>
    </div>
    `;

    let infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

    // infoWindow.open(this.map, marker);

  }

}
