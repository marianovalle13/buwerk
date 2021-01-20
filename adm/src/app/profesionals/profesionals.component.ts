import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import 'rxjs/add/operator/map';
import { ProfesionalsService } from '../services/profesionals.service';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionsService } from '../services/subscriptions.service';

@Component({
  selector: 'app-profesionals',
  templateUrl: './profesionals.component.html',
  styleUrls: ['./profesionals.component.sass'],
  providers: [ProfesionalsService, NgbModal, SubscriptionsService]
})
export class ProfesionalsComponent extends BasesComponent {
  provinces = [];
  closeResult: string;
  itemSelected: any = {};

  constructor(
    public router: Router,
    public profesionalsService: ProfesionalsService,
    public toastr: ToastsManager,
    private modalService: NgbModal,
    public subscriptionsService: SubscriptionsService,
  ) {
    super(router, <BaseService>profesionalsService, toastr);
  }

  getBaseURI() {
    return '/profesional';
  }

  getPopulates() {
    return ['city', 'province', 'country'];
  }

  changeStatus(event, item) {
    console.log('event ', event);
    console.log('event target.value', event.target.checked);

    let object = {
      id: item.id,
      status: event.target.checked
    }
    this.profesionalsService.update(object).then(res => console.log('res updated ', res))
  }

}
