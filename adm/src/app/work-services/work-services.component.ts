import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import 'rxjs/add/operator/map';
import { WorkServicesService } from '../services/work-services.service';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionsService } from '../services/subscriptions.service';

@Component({
  selector: 'app-work-services',
  templateUrl: './work-services.component.html',
  styleUrls: ['./work-services.component.scss'],
  providers: [WorkServicesService, NgbModal, SubscriptionsService]
})
export class WorkServicesComponent extends BasesComponent {
  provinces = [];
  closeResult: string;
  itemSelected: any = {};

  constructor(
    public router: Router,
    public workServicesService: WorkServicesService,
    public toastr: ToastsManager,
    private modalService: NgbModal,
    public subscriptionsService: SubscriptionsService,
  ) {
    super(router, <BaseService>workServicesService, toastr);
  }

  getBaseURI() {
    return '/services';
  }

  getPopulates() {
    return ['city', 'province', 'country', 'user', 'profesional'];
  }

  getSorted(){
    return {creationDate:-1}
  }

  open(content, item) {
    this.itemSelected = item;
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
}
