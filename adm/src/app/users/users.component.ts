import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import 'rxjs/add/operator/map';
import { UsersService } from '../services/users.service';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionsService } from '../services/subscriptions.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  providers: [UsersService, NgbModal, SubscriptionsService]
})
export class UsersComponent extends BasesComponent {
  provinces = [];
  closeResult: string;
  itemSelected: any = {};

  constructor(
    public router: Router,
    public userService: UsersService,
    public toastr: ToastsManager,
    private modalService: NgbModal,
    public subscriptionsService: SubscriptionsService,
  ) {
    super(router, <BaseService>userService, toastr);
  }

  getBaseURI() {
    return '/user';
  }

  getPopulates() {
    return ['city', 'province', 'country'];
  }

}
