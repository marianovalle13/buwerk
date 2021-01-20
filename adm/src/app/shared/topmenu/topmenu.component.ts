import { Component, OnInit } from '@angular/core';
import { UpdateHeaderService } from './../../services/update-header.service';
import { Constants } from './../../app.constants';
import { Router } from "@angular/router";

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.sass']
})
export class TopmenuComponent implements OnInit {
  is_admin_login: boolean = Constants.IS_ADMIN_LOGIN;
  app_version: string = Constants.APP_VERSION;
  app_title: string = Constants.APP_NAME;
  constructor(
    private sharedData: UpdateHeaderService,
    private router: Router
  ) {
    this.sharedData.currentAdmin.subscribe(data => this.is_admin_login = data);
  }

  ngOnInit() {
    //if (!this.is_admin_login) {
      //this.router.navigate(['/login']);
    //}
  }
  logout(){
    var self = this;
    this.sharedData.changeAdmin(false);
    Constants.IS_ADMIN_LOGIN = false;
    setTimeout(function(){
      self.router.navigate(['/login']);
    }, 500);
  }

}
