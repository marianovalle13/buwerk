import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-base',
  templateUrl: 'base.html'
})
export class BasePage {

  loading: any;
  formObject: any = { value: null };

  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController
  ) {
  }

  // (+) Loading
  showLoading(content?) {
    if(!content) content = '';
    this.loading = this.loadingCtrl.create({
      content: content
    });
    if (!this.loading) {
      this.loading.present();
    }
  }
  hideLoading() {
    if(this.loading) {
      this.loading.dismiss();
    }
  }
  // (-) Loading


  // (+) Message
  showSuccess(message) {
    this.showMessage(message,"toast-success");
  }
  showError(message) {
    this.showMessage(message,"toast-error");
  }
  showWarning(message) {
    this.showMessage(message,"toast-warning");
  }
  showMessage(message,cssClass){
    let toast = this.toastCtrl.create({
      message: message,
      cssClass:cssClass,
      duration: 4000,
      position: 'top'
    });

    toast.present();
  }
  // (-) Message

  // (+) Utils
  getDayFormatted(timemillis){
    var date = new Date(timemillis);
    var sd = new Date(date.valueOf());
    return sd.getDate() + '/' + (sd.getMonth()+1) + '/' + sd.getFullYear();
  }

  getYearsOld(timemillis){
    var date = new Date(timemillis);
    var sd = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);

    var today = this.getToday();

    var yearsOld = today.getFullYear() - sd.getFullYear();

    return yearsOld;
  }

  getHHMMFormatted(time){

    //var sd = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
    var date = new Date(time);
    var sd = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);

    var ret = "";

    var hours = sd.getHours();
    if(hours == 0) ret = "00";
    else if(hours < 10) ret = "0" + hours;
    else ret = "" + hours;

    ret += ":";

    var minutes = sd.getMinutes();
    if(minutes == 0) ret += "00";
    else if(minutes < 10) ret += "0" + minutes;
    else ret += "" + minutes;

    return ret;
  }

  getToday(){
    var date = new Date();
    return  new Date(date.getTime() - date.getTimezoneOffset()*60000);
  }

  getTodayString(){
    return this.getToday().toISOString();
  }
  // (-) Utils

}
