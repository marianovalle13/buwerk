import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { BasePage } from '../base/base';
import { SubscriptionProvider } from '../../providers/subscription/subscription';
// import { PushProvider } from '../../providers/push/push';
import { Device } from '@ionic-native/device';
import { RegisterUserPage } from '../register-user/register-user';
import { RegisterProfessionalPage } from '../register-professional/register-professional';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user-select',
  templateUrl: 'user-select.html'
})
export class UserSelectPage extends BasePage {

  form: FormGroup;

  constructor(
    public storage: Storage,
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private device: Device,
  ) {
      super(toastCtrl, loadingCtrl, navCtrl);
    
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  showHome() {
    this.navCtrl.setRoot(TabsPage)
  }
  showRegisterUser() {
    this.navCtrl.push(RegisterUserPage)
  }

  showRegisterProfessional() {
    this.navCtrl.push(RegisterProfessionalPage);
  }

  goToHome(){
    this.navCtrl.setRoot(TabsPage);
  }

  goToLogin() {
    console.log("Back to Login");
    this.app.getRootNav().setRoot(LoginPage);

  }

  
}
