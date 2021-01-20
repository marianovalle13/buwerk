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
import { WorkStatusPage } from '../work-status/work-status';
import { ServicesProvider } from '../../providers/services/services';
import { ChatPage } from '../chat/chat';
import { ActionsProvider } from '../../providers/actions/actions';


@Component({
  selector: 'page-work',
  templateUrl: 'work.html',
  
})
export class WorkPage extends BasePage {

  user: any;

  items: any = [];

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
    public actionsProvider:ActionsProvider

  ) {
    super(toastCtrl, loadingCtrl, navCtrl);
    
  }


  ionViewDidEnter() {
    console.log('ionViewDidEnter()')
    this.getServices();
  }

  getServices() {
    this.storage.get(Constants.storage.user).then(userS => {
      this.user = userS;
      console.log('user: ', this.user);

      this.servicesProvider.getAllFilterAndSortAndPopulates({ profesional: this.user.id }, {"creationDate": -1}, ['user'])
        .then(servicesS => {

          this.items = servicesS;
          console.log('this.items ', this.items);

        })

    })
  }
  ionViewDidLoad(){
    setTimeout(() => {
      this.initalizePage()
    }, 250);
  }
  initalizePage() {
    console.log("initialize actions");
    // alert("ionViewDidLoad");
    // setTimeout( () => {
      setTimeout(() => {
        this.storage.get(Constants.storage.action).then(payload => {
          // alert(payload);
          console.log(payload, "payload")
    
          if (payload && (payload.action == Constants.actions.message)) {
            this.navCtrl.push(ChatPage, { item: payload.item, conversationId: payload.conversationId, typeUser: payload.typeUser })
          }
          // Profesional: finalizacion de servicio
          if (payload && (payload.action == Constants.actions.user_end_service)) {
            this.navCtrl.push(RequestInfoPage, { service: payload.service });
          }
          this.actionsProvider.removeAction(Constants.storage.action, payload)
          this.storage.remove(Constants.storage.action);
        });
        
      }, 500);
  }

  goToWorkStatus(item) {

    console.log('service ', item)
    this.navCtrl.setRoot(WorkStatusPage, { service: item });

  }

  getImage(image) {
    // console.log('image ', image)
    let res;
    res = Constants.FILES_BASE_URL + "/" + image;
    return res;
  }


}
