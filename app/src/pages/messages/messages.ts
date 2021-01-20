import { Component } from '@angular/core';
import { NavController, AlertController, App, Tabs, ToastController, LoadingController, PopoverController } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { Storage } from '@ionic/storage';
import { BasePage } from '../base/base';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { PushProvider } from '../../providers/push/push';
import { Device } from '@ionic-native/device';
import { ChatPage } from '../chat/chat';
import { Socket } from "ng-socket-io";
import { ConversationsProvider } from '../../providers/conversations/conversations';
import { RequestInfoPage } from '../request-info/request-info';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
  providers: [ConversationsProvider]
})
export class MessagesPage extends BasePage {

  conversations: any = [];

  type: any;

  constructor(
    private iab: InAppBrowser,
    public storage: Storage,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public popoverCtrl: PopoverController,
    private socket: Socket,
    // public pushProvider: PushProvider,
    private device: Device,
    private conversationsProvider: ConversationsProvider,
  ) {
    super(toastCtrl, loadingCtrl, navCtrl);
  }

 
  ionViewDidEnter() {
    console.log('ENTERED CHAT PAGE')
    this.socket.connect();
    this.getChats();

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
      this.storage.remove(Constants.storage.action);
    });
  }
  getChats() {

    this.storage.get(Constants.storage.user)
    .then( res => { 
      console.log('res ', res)

      let filter;

      if(res.category) {
        filter = {profesional: res.id}
        this.type = 'profesional';
      } else {
        filter = {user: res.id}
        this.type = 'user';
      }

      console.log('this.type ', this.type);

      this.conversations = [];

      this.conversationsProvider.getAllFilterAndSortAndPopulates(filter, {}, ['profesional','user'])
        .then( conversations => {
          console.log('conversations ', conversations);
          // this.conversations = conversations;
          conversations.forEach(element => {
            if(element.available) {
              this.conversations.push(element);
            }
          });

        })
    
    })
  }
  
  goToChat(item, id) {
    console.log('item ', item);
    this.navCtrl.push(ChatPage, {item: item, conversationId: id, typeUser: this.type});
  }

  getImage(image) {
    let res;
    res = Constants.FILES_BASE_URL + "/" + image;
    return res;
  }

}
