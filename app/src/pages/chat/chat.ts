import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Content } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Constants } from "../../app/app.constants";
import { Storage } from "@ionic/storage";
import { PushProvider } from "../../providers/push/push";
import { Socket } from "ng-socket-io";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConversationsProvider } from '../../providers/conversations/conversations';
import { MessagesProvider } from '../../providers/messages/messages';
import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: "page-chat",
  templateUrl: "chat.html",
  providers: [PushProvider]
})
export class ChatPage {
  @ViewChild(Content) content: Content;

  item: any;
  conversationId: any;
  type: any;
  conversation: any;
  isAvailable: boolean = false;
  improper: boolean = false;

  form: FormGroup;

  messages: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pushProvider: PushProvider,
    private storage: Storage,
    private socket: Socket,
    private formBuilder: FormBuilder,
    private conversationsProvider: ConversationsProvider,
    private messagesProvider: MessagesProvider,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.item = this.navParams.get('item');
    console.log('item ', this.navParams.get('item'));
    // console.log('conversationId ', this.navParams.get('conversationId'));
    this.conversationId = this.navParams.get('conversationId');
    this.type = this.navParams.get('typeUser');
    console.log('type ', this.navParams.get('typeUser'));
    this.form = this.createForm();

    this.getMessages().subscribe((message: any) => {
      console.log('new message ', message);
      if(this.type == message.author) {
        message.side = 'right';
      } else {
        message.side = 'left';
      }
      this.messages.push(message);
      this.scroll();

    });
  }
  
  ionViewDidEnter() {
    console.log('ENTERED CHAT PAGE')
    this.socket.connect();
    this.socket.emit("enter conversation", this.conversationId);
    this.getConversation();
  }

  //// ---- chat

  getConversation() {

    this.conversationsProvider.getAllFilterAndSortAndPopulates({_id: this.conversationId}, {}, ['user', 'profesional'])
    .then( conversationS => {

      let conversation = conversationS[0];
      if(conversation.blocked) {
        this.isAvailable = true;
      }
      if(conversation.improper) {
        this.improper = true;
      }
      console.log('this.isAvailable ', this.isAvailable)

      console.log('conversation ', conversation)
      this.conversation = { user: conversation.user, profesional: conversation.profesional }

      this.messagesProvider.getAllFilterAndSort({conversationId: this.conversationId}, {})
        .then(res => {
          console.log('res ', res)
          for(let message of res) {
            if(this.type == message.author) {
              message.side = 'right';
            } else if (message.author == 'adm') {
              message.side = 'center';
            } else {
              message.side = 'left';
            }
            this.messages.push(message);
          }
          this.scroll();
  
        })
    })

  }

  createForm() {
    return this.formBuilder.group({
      message: [null],
    });
  }

  scroll() {
    if (this.content._scroll) {
      setTimeout(() => {
        this.content.scrollToBottom(0);
      }, 30);
    }
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on("refresh messages", data => {
        console.log("REFRESH MESSAGE ", data);
        observer.next(data);
      });
    });
    return observable;
  }

  sendMessage() {
    console.log(this.form.value)

    let date = new Date;
    // let minutes = date.getMinutes();
    let minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
    let hour = date.getHours();
    let month = date.getMonth(); // beware: January = 0; February = 1, etc.
    let day = date.getDate();

    console.log('minutes ' + (date.getMinutes()<10?'0':'') + date.getMinutes() );

    let timeU = `${day}/${month+1} ${hour}:${minutes}`

    const message = {
      conversationId: this.conversationId,
      body: this.form.value.message,
      author: this.type,
      time: timeU
    };

    this.socket.emit("new message", message);
    
    this.form.controls["message"].setValue(null);
    this.scroll();
    
    /// push notification

    let userN;
    let titleN = 'Nuevo mensaje de '
    let messageN = message.body

    console.log('this.conversation ', this.conversation);
    let type
    let item
    if(this.type == 'profesional') {
      type= "user"
      item = this.conversation.profesional
      userN = this.conversation.user.id;
      titleN += this.conversation.profesional.name;
    } else {
      type = "profesional"
      item = this.conversation.user
      userN = this.conversation.profesional.id;
      titleN += this.conversation.user.name;
    }
    
    console.log('userN ', userN);
    console.log('titleN ', titleN);
    console.log('messageN ', messageN);
    // this.pushProvider.notify(this.user.id, type, title, this.text);
    // type = "1" xd
    console.log(item, "item to send")
    let payload = {
      type: "2",
      action: "message",
      conversationId: this.conversationId,
      item: item,
      typeUser: type
    }
    console.log(payload, "PAYLOAD")
    this.pushProvider.notify(userN, '1', titleN, messageN, true, payload);


  }

  //// ---- image

  getImage(image) {
    let res;
    res = Constants.FILES_BASE_URL + "/" + image;
    return res;
  }

  //// 

  presentActionSheet() { //// make chat improper or blocked
    let improper = false;
    let blocked = false;
    let classCss = '';
    let textImproper = 'Marcar chat como impropio';
    let textBlocked = 'Bloquear';

    this.conversationsProvider.getAllFilterAndSortAndPopulates({_id: this.conversationId}, {}, ['user', 'profesional'])
    .then( conversation => { 

      let conversationS = conversation[0];

      console.log('conversationS ', conversationS);
      console.log('this.type ', this.type);

      /// make not available for updating if the user didnt make the update

      if(conversationS.improper) {
        console.log('improper ', improper)
        improper = true;
        if(this.type == conversationS.improperBy) {
          textImproper = 'Desmarcar chat como impropio';
        } else {
          // textImproper = 'Marcar char como impropio';
          classCss = 'button-chat';
        }
      }
      if(conversationS.blocked) {
        console.log('blocked ', blocked)
        blocked = true;
        if(this.type == conversationS.blockedBy) {
          textBlocked = 'Desbloquear';
        } else {
          textBlocked = 'Bloqueado';
        }
      }

      const actionSheet = this.actionSheetCtrl.create({
        title: 'Información',
        buttons: [
          {
            text: textImproper,
            cssClass: classCss,
            role: 'destructive',
            handler: () => {
              if(!improper || (conversationS.improper && conversationS.improperBy == this.type)) {
                this.conversationsProvider.update({ id: this.conversationId, improper: !improper, improperBy: this.type }).then( res => console.log('updated ', res))
              }
            }
          },{
            text: textBlocked,
            handler: () => {
              if(!blocked || (conversationS.blocked && conversationS.blockedBy == this.type)) {
                this.conversationsProvider.update({ id: this.conversationId, blocked: !blocked, blockedBy: this.type }).then( res => {
                  console.log('updated ', res)
                  this.isAvailable = !blocked;
                })
              }
            }
          }
        ]
      });
      actionSheet.present();
    })
  }
}
