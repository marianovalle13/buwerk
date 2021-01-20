import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { BasePage } from '../base/base';
import { SubscriptionProvider } from '../../providers/subscription/subscription';
import { PushProvider } from '../../providers/push/push';
import { Device } from '@ionic-native/device';
import { UserSelectPage } from '../user-select/user-select';

import { UserProvider } from '../../providers/user/user';
import { ServicesPage } from '../services/services';
import { ProfesionalProvider } from '../../providers/profesional/profesional';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserProvider, SubscriptionProvider, PushProvider, ProfesionalProvider]
  // providers: [UserProvider, SubscriptionProvider, ProfesionalProvider]
})
export class LoginPage extends BasePage {

  form: FormGroup;

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public userProvider: UserProvider,
    public subscriptionProvider: SubscriptionProvider,
    public pushProvider: PushProvider,
    private device: Device,
    public profesionalsProvider: ProfesionalProvider,
  ) {
      super(toastCtrl, loadingCtrl, navCtrl);
      this.form = this.createForm();
  }

  createForm() {
    return this.formBuilder.group({
      user: [''],
      password: ['']
    });
  }

  login() {
    this.showLoading("");
    let user:any = this.form.value;

    //
    console.log('user ', user)

    this.userProvider.getAllFilterAndSort({ user: user.user}, {}).then( userS => {

      console.log('userS ', userS)

      // is there any user?
      if( userS.length > 0) {

        // -- user login
        this.userProvider.login(user)
          .then((u:any) => {
            // user = {user: u.user};

            console.log('u provider login ', u)

            if (u.accessToken) {
              user = u.user;
              console.log('user ', user )
            } else {
              user = u;
              console.log('user ', user)
            }

            this.storage.set(Constants.storage.user, user);
            //this.showMessage('Bienvenido!', '');
          })
          .then((subscription:any) => {
            return this.storage.set(Constants.storage.user, user);
          })
          .then(() => {
            this.navCtrl.setRoot(TabsPage, {
              user: 'user'
            });

            //// push notification
            this.storage.get(Constants.storage.user).then( res => {

              const userPush = {
                userApp: res.id
              };
              this.pushProvider.enablePN(userPush);
              this.showMessage('Bienvenido!', '');

            })

          })
          .catch(error => {
            this.showError("No puede ingresar");
          })
          .then(() => {
            this.hideLoading();
          });
        // -- /user login

      } else {

        // -- profesional login
        this.profesionalsProvider.login(user)
          .then((u:any) => {
            // user = {user: u.user};
            console.log('u provider login ', u)

            if(u.user.status) {

              if (u.accessToken) {
                user = u.user;
                console.log('user ', user)
              } else {
                user = u;
                console.log('user ', user)
              }

              this.storage.set(Constants.storage.user, u.user).then( res => {

                const userPush = {
                  userApp: res.id
                };
                this.pushProvider.enablePN(userPush);
                this.showMessage('Bienvenido!', '');

              })

              this.navCtrl.setRoot(TabsPage, {
                pro: 'pro'
              });


            } else {
              alert('Todavía no eres un usuario verificado')
            }


          })
          // .then((subscription:any) => {
          //   return this.storage.set(Constants.storage.user, user);
          // })
          // .then(() => {

          //   //// push notification
          //   this.storage.get(Constants.storage.user).then( res => {

          //     const userPush = {
          //       userApp: res.id
          //     };
          //     this.pushProvider.enablePN(userPush);
          //     this.showMessage('Bienvenido!', '');

          //   })
          // })
          .catch(err => {
            this.showError("No puede ingresar " + err);
          })
          .then(() => {
            this.hideLoading();
          });
        // -- /profesional login

      }

    })




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  showHome() {
    this.navCtrl.setRoot(TabsPage)
  }


  showUserSelection() {
    this.navCtrl.setRoot(UserSelectPage);
  }

  goToHome(){
    this.navCtrl.setRoot(TabsPage);
  }
}
