import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { NotificationService } from '../services/notification.service';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';
import { environment } from 'environments/environment';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass'],
  providers: [NotificationService]
})
export class NotificationsComponent extends BasesComponent {

  constructor(
    public router: Router,
    public notificationService: NotificationService,
    public toastr: ToastsManager
  ) {
    super(router, <BaseService>notificationService, toastr);
  }

  getBaseURI() {
    return '/notifications';
  }


}
