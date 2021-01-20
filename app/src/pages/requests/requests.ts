import { Component } from '@angular/core';
import { NavController, AlertController, App, Tabs, ToastController, LoadingController, PopoverController } from 'ionic-angular';
import { ArticlePage } from '../article/article';
import { ArticleProvider } from '../../providers/article/article';
import { Constants } from '../../app/app.constants';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { SubscriptionProvider } from '../../providers/subscription/subscription';
import { MPProvider } from '../../providers/mp/mp';
import { BasePage } from '../base/base';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FilterPopoverComponent } from '../../components/filter-popover/filter-popover';
// import { PushProvider } from '../../providers/push/push';
import { Device } from '@ionic-native/device';
import { RequestInfoPage } from '../request-info/request-info';
import { ServicesProvider } from '../../providers/services/services';

@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
  
})
export class RequestsPage extends BasePage {

  items:any;

  user;

  constructor(
    private iab: InAppBrowser,
    public storage: Storage,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public popoverCtrl: PopoverController,
    // public pushProvider: PushProvider,
    private device: Device,
    public servicesProvider: ServicesProvider,
  ) {
    super(toastCtrl, loadingCtrl, navCtrl);

    this.storage.get(Constants.storage.user).then(userS => {
      this.user = userS;
      console.log('user: ', this.user);
    }) 
    
  }
 
  ionViewDidEnter() {
    console.log('ionViewDidEnter()')
    this.intializePage();
    this.getServices();
  }

  intializePage() {
    console.log("Initialize Page");
  }

  getServices() {
    this.servicesProvider.getAllFilterAndSortAndPopulates({ user: this.user.id }, {}, ['profesional']).then(profesionals => {
        this.items = profesionals.reverse();


      })
  }
  
  goToRequestInfo(item) {
    this.navCtrl.push(RequestInfoPage, { service: item });
  }

  getIcon(value){
    let icon;
    switch (value) {
      case "Terminado":
        icon = "done-all"
        break;
      case "Pendiente":
        icon = "time"
        break;
      case "Confirmado":
        icon = "checkmark"
        break;
      case "Rechazado":
        icon = "close"
        break;
      default:
        icon = "help"
        break;
    }
    return icon;
  }

  getIconColor(value){
    let color;
    switch (value) {
      case "Terminado":
        color = "secondary"
        break;
      case "Pendiente":
        color = "alt"
        break;
      case "Confirmado":
        color = "success"
        break;
      case "Rechazado":
        color = "danger"
        break;
      default:
        color = "gray"
        break;
    }
    return color;
  }

  getImage(image) {
    // console.log('image ', image)
    let res;
    res = Constants.FILES_BASE_URL + "/" + image;
    return res;
  }

}
