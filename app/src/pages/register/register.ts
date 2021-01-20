import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { SubscriptionProvider } from '../../providers/subscription/subscription';
import { Storage } from '@ionic/storage';
import { Constants } from '../../app/app.constants';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [UserProvider,SubscriptionProvider]
})
export class RegisterPage extends BasePage {

  form: FormGroup;

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public userProvider: UserProvider,
    public subscriptionProvider: SubscriptionProvider
  ) {
    super(toastCtrl, loadingCtrl, navCtrl);
    this.form = this.createForm();
  }

  createForm() {
    return this.formBuilder.group({
      user: [''],
      firstName: [''],
      lastName: [''],
      repassword: [''],
      password: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  showLogin(){
    this.navCtrl.pop();
  }

  register(){
    if(this.validatePassword())
      this.registerUser();
  }

  validatePassword() {
    if(this.form.value.password != this.form.value.repassword){
      this.showError("El password debe coincidir");
      return false;
    }

    if(this.form.value.password.length < 6){
      this.showError("El password debe tener al menos 6 caracteres");
      return false;
    }

    return true;
  }

  registerUser() {
    this.showLoading("");
    let user = this.form.value;

    this.userProvider.create(user)
      .then(u => {
        user = u;
        this.storage.set(Constants.storage.user, u);
      })
      // .then(() => {
      //   this.subscriptionProvider.create({user:user.id});
      // })
      .then(() => {
        this.showSuccess("Usuario registrado con Exito!");
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(error => {
        if(error == "ValidationError")
          this.showError("No se puede registrar porque el email ya existe.");
        else
          this.showError("No se puede registrar");
      })
      .then(() => {
        this.hideLoading();
      });

    }

  // registerUser() {
  //   this.showLoading("");
  //   let user = this.form.value;
  //
  //   this.userProvider.create(user)
  //     .then(user => {
  //       this.storage.set(Constants.storage.user, user)
  //         .then(() => {
  //           this.showSuccess("Usuario registrado con Exito!");
  //           this.navCtrl.setRoot(TabsPage);
  //         })
  //         .catch(error => {
  //           this.showError("No se puede registrar");
  //         })
  //         .then(() => {
  //           this.hideLoading();
  //         });
  //     })
  //     .catch(error => {
  //       if(error == "ValidationError")
  //         this.showError("No se puede registrar porque el email ya existe.");
  //       else
  //         this.showError("No se puede registrar");
  //       this.hideLoading();
  //     });
  // }


}
