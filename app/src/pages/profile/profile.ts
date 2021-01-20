import { Component } from '@angular/core';
import { NavController, App, ToastController, LoadingController} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { MPProvider } from '../../providers/mp/mp';
import { Constants } from '../../app/app.constants';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BasePage } from '../base/base';
import { SubscriptionProvider } from '../../providers/subscription/subscription';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvidersSettingsProvider } from '../../providers/providers-settings/providers-settings';
import { LocationsPage } from '../locations/locations';
import { RegisterUserPage } from '../register-user/register-user';
import { RequestsPage } from '../requests/requests';
import { UsersProvider } from '../../providers/users/users';
import { PushProvider } from '../../providers/push/push';
import { ChatPage } from '../chat/chat';
import { RequestInfoPage } from '../request-info/request-info';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [ MPProvider, SubscriptionProvider, UserProvider, ProvidersSettingsProvider, PushProvider]
})
export class ProfilePage extends BasePage {

  user: any;
  subscriptionEnabled = false;
  form: FormGroup;

  price: any;

  activeLocation: any = 'Ninguna';

  constructor(
    private iab: InAppBrowser,
    public app: App,
    public storage: Storage,
    public navCtrl: NavController,
    public mpProvider: MPProvider,
    public userProvider: UserProvider,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public subscriptionProvider: SubscriptionProvider,
    public providersSettingsProvider: ProvidersSettingsProvider,
    private usersProvider: UsersProvider,
    public pushProvider: PushProvider,

  ) {
    super(toastCtrl, loadingCtrl, navCtrl);

    

  }
  ionViewDidLoad(){
    setTimeout(() => {
      this.initalizePage()
    }, 250);
  }
  initalizePage() {
    console.log("ionViewDidLoad services");
    // alert("ionViewDidLoad");
    // setTimeout( () => {
    this.storage.get(Constants.storage.action).then(payload => {
      // alert(payload);
      if (payload && (payload.action == Constants.actions.message)) {
        this.navCtrl.push(ChatPage, { item: payload.item, conversationId: payload.conversationId, typeUser: payload.typeUser })
      }
      // Profesional: finalizacion de servicio
      if (payload && (payload.action == Constants.actions.user_end_service)) {
        this.navCtrl.push(RequestInfoPage, { service: payload.service });
      }
      this.storage.remove(Constants.storage.action);
    });
  }
  ionViewDidEnter(){

    this.storage.get(Constants.storage.user).then(userS => {
      console.log('userS: ', userS);
      console.log('userS.id: ', userS.id);

      this.user = userS;

      this.getActiveLocation(userS.user);
    });
    
  }

  getActiveLocation(user) {
    this.usersProvider.getAllFilterAndSort({ user: user }, {}).then(userS => {
      let userU = userS[0];

      console.log('userS userS', userS);

      this.user = userU;

      if(userU.places.length !== 0) {

        for (let i of userU.places) {
          if (i.active === true) {
            console.log(i);
            this.activeLocation = i.tag;
            break;

          } else {
            this.activeLocation = 'Ninguna';
          }
        }
      } else {
        this.activeLocation = 'Ninguna';
      }

    })
  }

  logOut() {
    console.log("Back to Login");

    this.storage.get(Constants.storage.user).then( userS => {
      this.pushProvider.unregisterPN(userS.id);
      this.storage.remove(Constants.storage.user).then( del => {
        this.app.getRootNav().setRoot(LoginPage);
      });
    })

  }

  goToLocations() {
    this.navCtrl.push(LocationsPage);
  }

  goToProfile() {
    this.navCtrl.push(RegisterUserPage);
  }

  goToRequests() {
    this.navCtrl.push(RequestsPage);
  }

  getImage(image) {
    // console.log('this.user ', this.user)

    // console.log('image ', image );
    let res;
    res = Constants.FILES_BASE_URL + "/" + image;
    return res;
  }
}
