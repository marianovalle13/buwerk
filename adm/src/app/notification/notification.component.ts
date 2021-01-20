import { Component, ViewChild, NgZone, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { BaseService } from '../services/base.service';
import { BaseComponent } from '../base/base.component';
import { Constants } from '../app.constants';
import { environment } from 'environments/environment';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass'],
  providers: [NotificationService, UsersService]
})
export class NotificationComponent extends BaseComponent {
  registered: any = [];

  selectedUsers: any = [];

  usersArray: any = [];

  checkedUsers: boolean = false;

  forAll: boolean = true;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public toastr: ToastsManager,
    public notificationService: NotificationService,
    public usersService: UsersService,
  ) {
    super(router, formBuilder, route, toastr, <BaseService>notificationService);
    this.loadUsers()
  }

  loadUsers() {

    this.usersService.getAll({})
      .then(userS => {
        console.log(userS)
        // tslint:disable-next-line: forin
        for (const i of userS) {
          this.registered.push(i);
        }
        console.log(this.registered)
      });
  }


  getBasesURI() {
    return '/notifications';
  }

  getFormNew() {
    return this.formBuilder.group({
      id: [null],
      title: [null, Validators.required],
      message: [null, Validators.required],
      directedTo: [[]],
    })
  }

  // getFormEdit(item) {
  //   console.log('el item a editar: ', item);
  //   return this.formBuilder.group({
  //     id: [item.id],
  //     title: [item.title],
  //     access: [item.access],
  //     category: [item.category],
  //     image: [item.image],
  //     images: [item.images],
  //     video: [item.video],
  //     content: [item.content],
  //     price: [item.price]
  //   });
  // }


  //

  checkValue(event: any, user) {

    console.log(event.target.checked);

    if (event.target.checked === true) {
      this.usersArray.push(user)
      console.log(this.usersArray);
    } else {
      for (const i of this.usersArray){
        if (i === user) {
          const index = this.usersArray.indexOf(i);
          this.usersArray.splice(index, 1);
          console.log(this.usersArray);
        }
      }
    }
  }

  selectAll(event: any) {
    console.log('selectAll ', event.target.checked);

    if (event.target.checked === true) {
      this.checkedUsers = true;
      for (const i of this.registered){
        this.usersArray.push(i);
      }
      console.log(this.usersArray)
    } else {
      this.checkedUsers = false;
      this.usersArray = [];
    }
  }

  notifyAll(event: any) {

    console.log('selectAll ', event.target.checked);

    if (event.target.checked === true) {

      this.forAll = true;
      console.log

    } else {

      this.forAll = false;

    }

  }

  logForm(values) {
    console.log('logForm ', values);
    values.directedTo = this.usersArray
    super.logForm(values);

    this.sendPushNotification(values)
  }

  sendPushNotification(values) {

    const usersId = [];

    for (const i of this.usersArray) {
      usersId.push(i.id)
    }


    console.log('sendPushNotification Constants.PUSH_APP_ID', Constants.PUSH_APP_ID)
    console.log('sendPushNotification this.usersArray', usersId)
    console.log('sendPushNotification this.forAll', this.forAll)
    console.log('sendPushNotification values.title', values.title)
    console.log('sendPushNotification values.message', values.message)

    const obj: any = {
      'app': Constants.PUSH_APP_ID,
      'usersApp': usersId,
      'forAll': this.forAll,
      'type': '1',
      'title': values.title,
      'message': values.message,
    }

    this.notificationService.sendPush(obj)
      .then(res => {
        console.log('Push Sent');
      })
      .catch(e => {
        console.log(e);
      })
  }

}
