import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController,NavParams, App, Tabs, ToastController, LoadingController, PopoverController } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { BasePage } from '../base/base';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PushProvider } from '../../providers/push/push';
import { RequestPage } from '../request/request';
import { ServicesProvider } from '../../providers/services/services';
import { ConversationsProvider } from '../../providers/conversations/conversations';
import { ProfesionalProvider } from '../../providers/profesional/profesional';
import { GoogleService } from '../../providers/google';
import { TabsPage } from '../tabs/tabs';
import { Socket } from "ng-socket-io";
import { ServicesMapPage } from '../services-map/services-map';

declare var google;

@Component({
  selector: 'page-work-status',
  templateUrl: 'work-status.html',
  providers: [ConversationsProvider, GoogleService, PushProvider, ProfesionalProvider]
  
})
export class WorkStatusPage extends BasePage {

  item: any;

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
    public navParams: NavParams,
    public servicesProvider: ServicesProvider,
    public conversationsProvider: ConversationsProvider,
    public googleService: GoogleService,
    private socket: Socket,
    private profesionalProvider: ProfesionalProvider,
  ) {
    super(toastCtrl, loadingCtrl, navCtrl);

    this.item = this.navParams.get('service');
    console.log('item ', this.item);

  }

 
  ionViewDidEnter() {
    this.intializePage();
  }

  intializePage() {
    console.log("Initialize Page");
  }
  
  goToRequest() {
    this.navCtrl.push(RequestPage);
  }

  serviceStatus(status) {
    console.log('serviceStatus ', status);

    let object = {
      id: this.item.id,
      status: status
    }

    console.log('object ', object)

    this.servicesProvider.update(object)
      .then( (serviceS: any) => {

        /// push notification

        console.log('serviceS ', serviceS)
        this.profesionalProvider.getById(serviceS.profesional)
          .then( (profesionalS:any) => {

            let userN = serviceS.user;
            let titleN = 'Actualización de ' + profesionalS.name
            let messageN = 'El servicio a sido ' + status
            console.log('userN ', userN);
            console.log('titleN ', titleN);
            console.log('messageN ', messageN);
            let service = serviceS
            service.profesional = profesionalS
            console.log(service, "service")
            let payload = {
              type: "2",
              action: "user_end_service",
              service:serviceS
            }
            console.log(payload, "PAYLOAD")
            if(status == 'Terminado'){
              this.pushProvider.notify(userN, '1', titleN, messageN, true, payload);
            }else{
              this.pushProvider.notify(userN, '1', titleN, messageN)
            }
          })


        ///

        this.navCtrl.setRoot(TabsPage, {
              pro: 'pro'
            });

        if(status == 'Confirmado') {
          console.log('------- CONFIRMADO -------');

          console.log('this.item ', this.item);

          let conver = {
            user: this.item.user.id,
            profesional: this.item.profesional,
            messages: []
          }

          this.conversationsProvider.getAllFilterAndSort({ user: this.item.user.id, profesional: this.item.profesional}, {})
            .then( res => {
              console.log('this.conversationsProvider ', res);

              if(res.length !== 0) {
                console.log('there is already a conversation');
                this.conversationsProvider.getAllFilterAndSort({ user: this.item.user.id, profesional: this.item.profesional}, {})
                .then( res => {
                  console.log('res ', res);
                  if(res.length !== 0) {
                    this.conversationsProvider.update({id: res[0].id, available: true}).then( removed => console.log('removed ', removed))
                  }
                })
              } else {
                this.conversationsProvider.create(conver)
                  .then( conversationRes => {
                    console.log('conversationRes ', conversationRes);
                    this.socket.emit("enter conversation", conversationRes);
                  })
              }
            })
        }

        if(status == 'Rechazado' || status == 'Terminado') {
          this.conversationsProvider.getAllFilterAndSort({ user: this.item.user.id, profesional: this.item.profesional}, {})
            .then( res => {
              console.log('res ', res);
              if(res.length !== 0) {
                this.conversationsProvider.update({id: res[0].id, available: false}).then( removed => console.log('removed ', removed))
              }
            })
        }
      })
  }

  getImage(image) {
    let res;
    res = Constants.FILES_BASE_URL + "/" + image;
    return res;
  }

  showMap() {
    console.log('this.item ', this.item)
    this.navCtrl.push(ServicesMapPage,{ location: this.item });
  }
  
}
