import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { BasePage } from '../base/base';
import { NotificationProvider } from '../../providers/notification/notification';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
  providers: [NotificationProvider]
})
export class NotificationsPage extends BasePage {
  notifications: any = [
    // {
    //   id:1,
    //   title: "Título de la Notificación",
    //   content: "Art party freegan tofu XOXO squid scenester irony pour-over fanny pack small batch sartorial Neutra lo-fi quinoa gastropub forage DIY banjo street",
    //   date: "12/05/2019 15:30"
    // },
    // {
    //   id:2,
    //   title: "Título de la Notificación",
    //   content: "Art party freegan tofu XOXO squid scenester irony pour-over fanny pack small batch sartorial Neutra lo-fi quinoa gastropub forage DIY banjo street",
    //   date: "12/05/2019 15:30"
    // },
    // {
    //   id:2,
    //   title: "Título de la Notificación",
    //   content: "Art party freegan tofu XOXO squid scenester irony pour-over fanny pack small batch sartorial Neutra lo-fi quinoa gastropub forage DIY banjo street",
    //   date: "12/05/2019 15:30"
    // },
    // {
    //   id:2,
    //   title: "Título de la Notificación",
    //   content: "Art party freegan tofu XOXO squid scenester irony pour-over fanny pack small batch sartorial Neutra lo-fi quinoa gastropub forage DIY banjo street",
    //   date: "12/05/2019 15:30"
    // }
  ];

  notificationsNew: any = [];

  user: any = "";

  // user: any = "-1"; //"5cd1c99480fb4e2594db4b68"

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public notificationProvider: NotificationProvider,
  ) {
    super(toastCtrl, loadingCtrl, navCtrl);
  }

  ionViewDidEnter(){

    this.storage.get(Constants.storage.user).then((val) => {
      this.user = val;
      console.log("User: " + JSON.stringify(this.user))

      this.loadNotifications();
    });

  }

  //
  // loadNotifications() {
  //   let userId = "-1";
  //   this.showLoading("");
  //   if(this.user) userId = this.user.id;
  //   this.notificationProvider.getByUser(userId).then(items => {
  //     this.notifications = items;
  //   })
  //   .then(() => {
  //     this.hideLoading();
  //   });
  // }

    loadNotifications() {
      let userId = "-1";
      
      // this.showLoading("");

      this.notificationProvider.getByUser(this.user.id)
        .then(items => {
          console.log(items);
          this.notifications = items;
        })
        // .then(() => {
        //   this.hideLoading();
        // });
  }


}
