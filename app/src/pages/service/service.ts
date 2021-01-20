import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, App, Tabs, ToastController, LoadingController, PopoverController } from 'ionic-angular';
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
import { RegisterUserPage } from '../register-user/register-user';
import { RequestPage } from '../request/request';
import { ProfesionalProvider } from '../../providers/profesional/profesional';
import { ComentsProvider } from '../../providers/coments/coments';

@Component({
  selector: 'page-service',
  templateUrl: 'service.html',
  providers: [ProfesionalProvider]
})
export class ServicePage extends BasePage {

  item: any = {};
  comment: any;
  comments: any = [];
  
  profesional: any;

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
    public navParams: NavParams,    
    public profesionalProvider: ProfesionalProvider,
    public comentsProvider: ComentsProvider,
  ) {
    super(toastCtrl, loadingCtrl, navCtrl);

    this.profesional = this.navParams.get('id');
  }
 
  ionViewDidEnter() {
    this.intializePage();
    this.getProfesional();
    this.getComments();
  }

  getProfesional() {

    console.log('this.navParams.get(id)', this.navParams.get('id'));
    this.profesionalProvider.getById(this.navParams.get('id')).then(profesionals => {
      this.item = profesionals;
      console.log('profesional provider service ', this.item)
    
    })
  }

  intializePage() {
    console.log("Initialize Page");
  }
  
  goToRequest() {
    this.navCtrl.push(RequestPage, { profesional: this.item });
  }
  
  getImage(image) {
    let res;
    res = Constants.FILES_BASE_URL + "/" + image;
    return res;
  }

  // coments

  createComment() {

    this.storage.get(Constants.storage.user).then( res => {
      const data: any = {
        user: res.id,
        profesional: this.profesional,
        comment: this.comment
      };
      console.log('data', data);

      this.comentsProvider.create(data).then( created => {
        this.clearComment();
        this.getComments();
      })

    })

  }

  clearComment() {
    this.comment = "";
  }

  getComments() {
    console.log('this.profesional ', this.profesional);
    this.comments = [];
    this.comentsProvider.getAllFilterAndSortAndPopulates({ profesional: this.profesional }, {"timestamp": -1}, ["user"])
      .then(res => {
        // this.comments = res;
        for(let i of res) {
          let year = i.timestamp.slice(0, 4);
          let day = i.timestamp.slice(8, 10);
          let month = i.timestamp.slice(5, 7);
          let date = `${day}/${month}/${year}`;
          i.timestamp = date;
          this.comments.push(i);
        }
        console.log('this.comments ', this.comments);
      })
  }
}
