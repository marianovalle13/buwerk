import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UpdateHeaderService {

  private isLoginSource = new BehaviorSubject<boolean>(false);
  currentIsLogin = this.isLoginSource.asObservable();

  private adminSource = new BehaviorSubject<boolean>(false);
  currentAdmin = this.adminSource.asObservable();

  constructor() { }

  changeIsLogin(newStatus: boolean) {
    this.isLoginSource.next(newStatus);
  }
  changeAdmin(adminStatus: boolean) {
    console.log('Show admin: ' + adminStatus);
    this.adminSource.next(adminStatus);
  }
}
