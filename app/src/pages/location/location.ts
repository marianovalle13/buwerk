import { Component } from '@angular/core';
import { NavController, AlertController, App, Tabs, ToastController, LoadingController, PopoverController } from 'ionic-angular';
import { ArticlePage } from '../article/article';
import { ArticleProvider } from '../../providers/article/article';
import { Constants } from '../../app/app.constants';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { SubscriptionProvider } from '../../providers/subscription/subscription';
import { MPProvider } from '../../providers/mp/mp';
import { BasePage } from '../base/base';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FilterPopoverComponent } from '../../components/filter-popover/filter-popover';
// import { PushProvider } from '../../providers/push/push';
import { Device } from '@ionic-native/device';
import { RegisterUserPage } from '../register-user/register-user';
import { UsersProvider } from '../../providers/users/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
  providers: [UsersProvider]
})
export class LocationPage extends BasePage {

  form: any;
  user: any;

  constructor(
    private iab: InAppBrowser,
    public storage: Storage,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public popoverCtrl: PopoverController,
    // public pushProvider: PushProvider,
    private device: Device,
    private usersProvider: UsersProvider,
    private formBuilder: FormBuilder,
  ) {
    super(toastCtrl, loadingCtrl, navCtrl);

    this.form = this.createForm();

  }

  ionViewDidEnter() {
    this.intializePage();
    this.storage.get(Constants.storage.user).then( userU => {
      this.user = userU
    })
  }

  createForm() {
    return this.formBuilder.group({
      tag: [null, Validators.required],
      street: [null, Validators.required],
      floor: [null],
      number: [null],
      active: false,

    });
  }

  intializePage() {
    console.log("Initialize Page");
  }

  addLocation() {
    console.log('this.form.value ', this.form.value)

    console.log('this.user ', this.user);

    this.usersProvider.getAllFilterAndSort({ user: this.user.user }, {}).then(userS => {
      console.log('userU ', userS)

      let userU = userS[0];

      let updateLocations =
        {
          id: this.user.id,
          places: []
        };


      if (userU.places) {
        if (userU.places.length != 0) {
          for (let i of userU.places) {
            updateLocations.places.push(i)
          }
        }
      }

      console.log('updateLocations before push ', updateLocations);

      updateLocations.places.push(this.form.value);

      console.log('updateLocations ', updateLocations);

      /// replacing not updating
      this.usersProvider.update(updateLocations).then( res => {
        console.log('user updated ', res)
        this.navCtrl.pop();

      })

      // for (let o of userU.places) {
      //   if (this.form.value.street === o.street) {

      //   }
      // }

    })



  }



}
