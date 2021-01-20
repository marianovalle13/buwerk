import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import 'rxjs/add/operator/map';
import { UsersService } from '../services/users.service';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionsService } from '../services/subscriptions.service';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-users',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.sass'],
  providers: [UsersService, NgbModal, SubscriptionsService, ConversationService]
})
export class ChatsComponent extends BasesComponent {
  provinces = [];
  conversations = [];
  closeResult: string;
  itemSelected: any = {};

  constructor(
    public router: Router,
    public userService: UsersService,
    public toastr: ToastsManager,
    private modalService: NgbModal,
    public subscriptionsService: SubscriptionsService,
    public conversationService: ConversationService,
  ) {
    super(router, <BaseService>conversationService, toastr);
    this.getConversations();
  }

  getBaseURI() {
    return '/chat';
  }

  getPopulates() {
    return ['user', 'profesional'];
  }

  getConversations() {
    this.conversationService.getAllFilterSortAndPopulate({}, { date: -1 }, ['user', 'profesional'])
      .then( res => {
        console.log('res ', res)
        this.conversations = res;

      })
  }
}
