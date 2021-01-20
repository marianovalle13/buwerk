import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Device } from '@ionic-native/device';
import { Constants } from './app.constants';
import { UsersProvider } from '../providers/users/users';
import { ActionsProvider } from '../providers/actions/actions';
import { PushProvider } from '../providers/push/push';

@Component({
  templateUrl: 'app.html',
  providers: [UsersProvider, PushProvider],
})

export class MyApp {

  // rootPage:any;
  @ViewChild('myNav') nav: NavController
  public rootPage: any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private events: Events,
    private toastCtrl: ToastController,
    private device: Device,
    public pushProvider: PushProvider,
    public userProvider: UsersProvider,
    public storage: Storage,
    public actionsProvider:ActionsProvider
    // public navCtrl: NavController,
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.rootPage = LoginPage;

      // Actions
      this.actionsProvider.checkActions();
      platform.resume.subscribe(() => {
        this.actionsProvider.checkActions();
      });

      //// --- go to home if user is logged in
      this.storage.get(Constants.storage.user).then(userS => {

        console.log('userS register pro', userS)

        if (userS) {
          console.log('userS ', userS);

          this.userProvider.getAllFilterAndSort({ user: userS.user }, {}).then(userS => { 

            if (userS.length > 0) { 
              this.nav.setRoot(TabsPage, {
                user: 'user'
              });
              const user = {
                userApp: userS.id
              };
              this.pushProvider.enablePN(user);
            } else {
              this.nav.setRoot(TabsPage, {
                pro: 'pro'
              });
              const user = {
                userApp: userS.id
              };
              this.pushProvider.enablePN(user);
            }
          })

        } else {
          this.rootPage = LoginPage;
        }
        
      });

    statusBar.styleDefault();
    splashScreen.hide();  

    //Show Foreground Notification
    this.events.subscribe('foregroundNotification', (notification) => {
      console.log(notification);
      if (notification.additionalData) {
        if (notification.additionalData.payload) {
          const payload = notification.additionalData.payload;
          this.actionsProvider.addAction(payload.action,payload);
          if (!notification.additionalData.foreground) {
            this.storage.set(Constants.storage.action, payload);
          }
        }

      } else {
        const toast = this.toastCtrl.create({
          message: notification.title + ': ' + notification.message,
          duration: 5000,
          position: 'top'
        });
        toast.onDidDismiss(() => {
          console.log('Cancelar Notificación');
        });
        toast.present();
      }
    });
    
  }

)}
}
