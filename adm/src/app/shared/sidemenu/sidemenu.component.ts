import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from './../../app.constants';
import { UpdateHeaderService } from './../../services/update-header.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.sass']
})
export class SidemenuComponent implements OnInit {
  subscriptionUpdateUserService: Subscription;
  isLoggedIn: boolean = false;
  userId: string = undefined;
  userName: string;

  constructor(
    private sharedData: UpdateHeaderService,
    private router: Router
  ) {
    this.loadUser();
    if (this.userId) {
      this.sharedData.changeIsLogin(true);
    }

  }

  loadUser(){
    let user: any = {};
    user = localStorage.getItem(Constants.storage.user);
    if(user){
      this.userId = user.id;
      this.userName = user.name;
    }

    if (this.userId) {
      this.isLoggedIn = true;
    }
  }

  ngOnDestroy() {
    this.subscriptionUpdateUserService.unsubscribe();
  }

  ngOnInit() {
    console.log('Login');
    this.subscriptionUpdateUserService = this.sharedData.currentIsLogin.subscribe(data => {
      this.isLoggedIn = data;
      if (this.isLoggedIn) {
        this.loadUser();
        //this.router.navigate(['/students']);
      } else {
        this.router.navigate(['/login']);
      }
    })
  }
  logout() {
    localStorage.removeItem(Constants.storage.user);
    location.reload();
  }
}
