import { Component } from '@angular/core';
import { BaseService } from '../services/base.service';
import 'rxjs/add/operator/map';
import { UsersService } from '../services/users.service';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionsService } from '../services/subscriptions.service';
import { ConversationService } from '../services/conversation.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MessagesService } from '../services/messages.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
  providers: [UsersService, NgbModal, SubscriptionsService, ConversationService, MessagesService]
})
export class ChatComponent extends BasesComponent {
  provinces = [];
  closeResult: string;
  itemSelected: any = {};

  messages: any = [];
  formObject: any = { value: null };

  conversationId: any;

  constructor(
    public router: Router,
    public userService: UsersService,
    public toastr: ToastsManager,
    private modalService: NgbModal,
    public subscriptionsService: SubscriptionsService,
    public conversationService: ConversationService,
    public messagesService: MessagesService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    super(router, <BaseService>conversationService, toastr);

    this.getMessages();
    this.formObject = this.createForm();
  }

  createForm() {
    return this.formBuilder.group({
      message: [null, Validators.required],
    });
  }

  getBaseURI() {
    return '/user';
  }

  getPopulates() {
    return ['user', 'profesional'];
  }

  getMessages() {
    this.route.params.subscribe((params: Params) => {
      this.conversationId = params.id;
      this.messagesService.getAllSorted({ conversationId: params.id }, { 'date': -1 }, []).then( res => {
      // this.messagesService.getAll({ conversationId: params.id }).then( res => {
        this.messages = res;
        console.log('this.messages ', this.messages)
      });
    });
  }

  open(content, item) {
    this.itemSelected = item;
    //
    this.modalService.open(content, {}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  logForm(value) {
    console.log('value ', value);

    let date = new Date;
    let minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
    let hour = date.getHours();
    let month = date.getMonth();
    let day = date.getDate();

    console.log('minutes ' + (date.getMinutes()<10?'0':'') + date.getMinutes() );

    let timeU = `${day}/${month+1} ${hour}:${minutes}`

    const message = {
      conversationId: this.conversationId,
      body: value.message,
      author: 'adm',
      time: timeU
    };

    console.log('message ', message);

    this.messagesService.create(message)
    .then( res => {
      console.log('res ', res);
      this.getMessages();
    })
  }
}
