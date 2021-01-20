import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, App, Tabs, ToastController, LoadingController, PopoverController } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { BasePage } from '../base/base';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { PushProvider } from '../../providers/push/push';
import { Device } from '@ionic-native/device';
import { ServicePage } from '../service/service';
import { LocationsPage } from '../locations/locations';
import { ServicesMapPage } from '../services-map/services-map';
import { ProfesionalProvider } from '../../providers/profesional/profesional';
import { PopoverPage } from "../popover/popover";
import { Geolocation } from '@ionic-native/geolocation';
import { ActionsProvider } from '../../providers/actions/actions';
import { ServicesProvider } from '../../providers/services/services';
import { ChatPage } from '../chat/chat';
import { RequestInfoPage } from '../request-info/request-info';


@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
  providers: [ProfesionalProvider, Geolocation]

})
export class ServicesPage extends BasePage {

  items: any = [];

  filterSelected: any;
  actions: any = [];
  services: any = [];

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public popoverCtrl: PopoverController,
    // public pushProvider: PushProvider,
    private geolocation: Geolocation,
    public profesionalProvider: ProfesionalProvider,
    public actionsProvider: ActionsProvider,
    public serviceProvider: ServicesProvider,
    public ngZone: NgZone,


  ) {
    super(toastCtrl, loadingCtrl, navCtrl);

  }

  ionViewDidEnter() {
    
    this.getProfesionals();
  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.initalizePage()
    }, 250);
  }

  initalizePage() {
    console.log("initialize services");
    // alert("ionViewDidLoad");
    // setTimeout( () => {
      setTimeout(() => {
        this.storage.get(Constants.storage.action).then(payload => {
          // console.log(payload, "payload")
          // alert('version' + payload);
          if (payload && (payload.action == Constants.actions.message)) {
            this.navCtrl.push(ChatPage, { item: payload.item, conversationId: payload.conversationId, typeUser: payload.typeUser })
          }
          // Profesional: finalizacion de servicio
          if (payload && (payload.action == Constants.actions.user_end_service)) {
            this.navCtrl.push(RequestInfoPage, { service: payload.service });
          }
          this.storage.remove(Constants.storage.action);
        });
      }, 500);
  }
  goToService(itemId) {
    console.log(itemId)
    this.navCtrl.push(ServicePage, { id: itemId });
  }

  goToLocations() {
    this.navCtrl.push(LocationsPage);
  }

  getProfesionals() {
    let filters: any = { status: true };

    if (this.filterSelected) {
      filters.category = this.filterSelected;
    }

    console.log('filters ', filters);

    this.profesionalProvider.getAllFilterAndSort(filters, []).then(profesionals => {
      this.items = profesionals;

      console.log(this.items)
    })
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, { filterSelected: this.filterSelected }, {});

    popover.present({
      ev: myEvent,
    });
    popover.onDidDismiss((data => {
      if (data) {
        this.filterSelected = data;

      } else {
        this.filterSelected = undefined;
      }
      this.getProfesionals();
    }))
    console.log(this.filterSelected);
  }


  showMap() {
    this.navCtrl.push(ServicesMapPage, { items: this.items });
  }

  getImage(image) {
    let res;
    res = Constants.FILES_BASE_URL + "/" + image;
    return res;
  }




  // (-) Actions
}
