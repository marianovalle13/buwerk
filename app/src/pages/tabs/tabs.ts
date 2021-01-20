import { Component } from '@angular/core';
import { NotificationsPage } from '../notifications/notifications';
import { ProfilePage } from '../profile/profile';
import { Events,NavController, AlertController, App, Tab, Tabs, NavParams, } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Constants } from '../../app/app.constants';
import { LoginPage } from '../login/login';
import { MessagesPage } from '../messages/messages';
import { ServicesPage } from '../services/services';
import { RegisterUserPage } from '../register-user/register-user';
import { WorkPage } from '../work/work';
import { RegisterProfessionalPage } from '../register-professional/register-professional';
// import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('Tabs') Tabs: Tabs;

  tabServices = ServicesPage;
  tabRegisterProfessional = RegisterProfessionalPage;
  tabWork = WorkPage;
  tabMessages = MessagesPage;
  tabProfile = ProfilePage;
  // needCheckLogin = true;
  user: any;
  profesional: any;
  userId: any;
  professionalId: any;

  constructor(
    // private iab: InAppBrowser,
    public storage: Storage,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public app: App,
    public navParams: NavParams,
  ) {
    this.userId = this.navParams.get("user");
    console.log(this.userId);
    
    this.professionalId = this.navParams.get("pro");
    console.log(this.professionalId);
    
    this.storage.get(Constants.storage.user).then((user) => {
      this.user = user;
    });
    

  }


  // showProfile(){
  //   console.log("Check Login");
  //   this.goToLogin();
  //   // this.checkLogin("Para ver su perfil debe ingresar o registrarse!");
    
  // }


  goToLogin() {
    console.log("Back to Login");
    this.app.getRootNav().setRoot(LoginPage);

  }
}
