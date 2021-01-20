import { Component } from '@angular/core';
import { NavController, AlertController, App, Tabs, NavParams, ToastController, LoadingController, PopoverController } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { BasePage } from '../base/base';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PushProvider } from '../../providers/push/push';
import { Device } from '@ionic-native/device';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { ServicesProvider } from '../../providers/services/services';
import { UsersProvider } from '../../providers/users/users';
import { RequestsPage } from '../requests/requests';
import { NgZone } from '@angular/core';
import { ServicesPage } from '../services/services';


@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
  providers: [PushProvider]
})
export class RequestPage extends BasePage {

  user: any;
  profesional: any;
  activeLocation: any;

  form: any;

  constructor(
    private iab: InAppBrowser,
    public storage: Storage,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public popoverCtrl: PopoverController,
    public pushProvider: PushProvider,
    private device: Device,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public servicesProvider: ServicesProvider,
    private usersProvider: UsersProvider,
    private zone: NgZone
    
  ) {
    super(toastCtrl, loadingCtrl, navCtrl);

    this.storage.get(Constants.storage.user).then(userS => {
      console.log('userS request: ', userS);
      this.user = userS;
      console.log('user request: ', this.user);
      // this.getActiveLocation();
    })

    this.profesional = this.navParams.get('profesional');
    console.log('profesional request: ', this.profesional)

    //// TODO missing locations

    this.form = this.formBuilder.group({
      requiredDate: [null],
      requiredTime: [null],
      address: [null],
      city: [null],
      province: [null],
      country: [null],
      serviceType: [null],
      description: [null],
      user: [null],
      profesional: [null],
    });

    

  }

  getActiveLocation() {
    this.usersProvider.getAllFilterAndSort({ user: this.user.user }, {}).then(userS => {
      let userU = userS[0];
      console.log('userU ', userU);

      for (let i of userU.places) {
        console.log('i --------- ', i);
        if (i.active === true) {
          this.activeLocation = i.street;

          if(i.floor) {
            this.activeLocation = i.street + ', Piso ' + i.floor + ' Dpto ' + i.number ;
          }
          console.log('this.activeLocation ', this.activeLocation)
        }
      }

      console.log('this.activeLocation ', this.activeLocation)
    })

  }

 
  ionViewDidEnter() {
    this.intializePage();
    this.getActiveLocation();
  }

  intializePage() {
    console.log("Request Page");
    console.log('this.user ', this.user)

  }

  submitRequest() {
    if(this.form.value.requiredTime && this.form.value.requiredDate) {

      let object: any = {
        requiredTime: this.form.value.requiredTime,
        address: this.activeLocation,
        city: this.user.city ,
        province: this.user.province ,
        country: this.user.country ,
        serviceType: this.profesional.category ,
        description: this.profesional.shortDesc ,
        user: this.user.id ,
        profesional: this.profesional.id ,
      }
      //// TODO date comes from a input type date, should be ion datetime?
      let str = this.form.value.requiredDate;
      let year = str.slice(0, 4);
      let month = str.slice(5, 7);
      let day = str.slice(8, 10);
      object.requiredDate = `${day}/${month}/${year}`;
      if(this.activeLocation) {
        this.servicesProvider.create(object)
          .then( (serviceS:any) => {
            this.navCtrl.setRoot(ServicesPage);
            this.showMessage('Has realizado la solictiud!', '');
            let userN = serviceS.profesional;
            let titleN = 'Nueva solicitud!'
            let messageN = 'El usuario ' + this.user.name + ' a solicitado tus servicios';
            this.pushProvider.notify(userN, '1', titleN, messageN);
          })
      } else {
        alert('No tienes una ubcación activa! Crea una desde tu perfil para poder solicitar un servicio.');
      }
    } else {
      alert('Completa todos los datos para continuar.');
    }
  }
  
  getImage(image) {
    let res;
    res = Constants.FILES_BASE_URL + "/" + image;
    return res;
  }

  
}
