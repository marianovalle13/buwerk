import { Component } from '@angular/core';
import { NavController, AlertController, App, NavParams, Tabs, ToastController, LoadingController, PopoverController } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { BasePage } from '../base/base';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PushProvider } from '../../providers/push/push';
import { Device } from '@ionic-native/device';

import { ServicesProvider } from '../../providers/services/services';
import { ProfesionalProvider } from '../../providers/profesional/profesional';
import { UserProvider } from '../../providers/user/user';
import { UserProfesionalProvider } from '../../providers/user-profesional/user-profesional';
import { ConversationsProvider } from '../../providers/conversations/conversations';
import { RequestsPage } from '../requests/requests';


@Component({
  selector: 'page-request-info',
  templateUrl: 'request-info.html',
  providers: [PushProvider, ProfesionalProvider, ProfesionalProvider, UserProfesionalProvider, UserProvider]
})
export class RequestInfoPage extends BasePage {

  service: any;

  rate = 0;

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
    public servicesProvider: ServicesProvider,
    public profesionalProvider: ProfesionalProvider,
    public userProfesionalProvider: UserProfesionalProvider,
    public userProvider: UserProvider,
    public conversationsProvider: ConversationsProvider,

  ) {
    super(toastCtrl, loadingCtrl, navCtrl);

    this.service = this.navParams.get('service');
    console.log('service: ', this.service);
    //action: "user_end_service"
    // service:
    // address: "4807"
    // city: "5e4a9ad0dfb7fd22d5c9222c"
    // country: "5dc30304c26c180bbd0f3f7b"
    // creationDate: "2020-08-28T19:51:57.204Z"
    // description: "test profesional"
    // id: "5f49605d81aa42149d7c5068"
    // profesional: "5df10c432ca87211b3f766c2"
    // province: "5e4a9acbdfb7fd22d5c9222b"
    // requiredDate: "28/08/2020"
    // requiredTime: "19:51"
    // serviceType: "Mantenimiento"
    // status: "Terminado"
    // user: "5df10b612ca87211b3f766c0"
    // __proto__: Object
    // type: "2"
  }


  ionViewDidEnter() {
    this.intializePage();
    this.getRating();
  }

  intializePage() {
    console.log("Initialize Page");
  }

  //// ---- get rating if it was already done
  getRating() {
    this.userProfesionalProvider.getAllFilterAndSort({ profesional: this.service.profesional.id, user: this.service.user }, {})
      .then(profesionalS => {
        console.log('profesionalS ', profesionalS);
        if (profesionalS.length !== 0) {
          this.rate = profesionalS[0].rating
        }
      })
  }

  //// ---- RATING PROFESIONAL
  rateProfesional(number) {
    this.rate = number;

    //// ---- message for toast
    let message = 'Has calificado con ' + this.rate + ' estrellas!';

    this.userProfesionalProvider.getAllFilterAndSort({ profesional: this.service.profesional.id, user: this.service.user }, {})
      .then(userpro => {

        console.log('userpro ', userpro);
        console.log('this.service ', this.service.profesional);
        console.log('this.service ', this.service.profesional.id);

        let rate: any = {
          rating: number,
          user: this.service.user,
          profesional: this.service.profesional.id
        }

        if (userpro.length !== 0) {
          rate.id = userpro[0].id
        }

        console.log('rate ', rate);
        console.log('DATA STEP 1 ', rate);

        this.userProfesionalProvider.create(rate)
          .then(result => {
            console.log('result ', result);
            this.showMessage(message, '');
          })
      })

  }

  cancelService() {

    let object = {
      id: this.service.id,
      status: 'Rechazado'
    }

    /// push notification
    console.log('this.service ', this.service)
    this.userProvider.getById(this.service.user)
      .then((userS: any) => {

        let userN = this.service.profesional.id;
        let titleN = 'Actualización de ' + userS.name
        let messageN = 'El servicio a sido rechazado'
        console.log('userN ', userN);
        console.log('titleN ', titleN);
        console.log('messageN ', messageN);

        this.pushProvider.notify(userN, '1', titleN, messageN);
      })


    ///

    this.servicesProvider.update(object)
      .then((serviceS: any) => {
        console.log('serviceS ', serviceS)
        this.navCtrl.setRoot(RequestsPage);

        this.conversationsProvider.getAllFilterAndSort({ user: serviceS.user, profesional: serviceS.profesional }, {})
          .then(res => {
            console.log('res ', res)
            if (res.length !== 0) {
              console.log('res[0].id ', res[0].id)
              this.conversationsProvider.update({ id: res[0].id, available: false }).then(removed => console.log('removed ', removed))
            }
          })
      })
  }

  getImage(image) {
    let res;
    res = Constants.FILES_BASE_URL + "/" + image;
    return res;
  }


}
