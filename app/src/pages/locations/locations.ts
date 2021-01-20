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
import { LocationPage } from '../location/location';
import { UsersProvider } from '../../providers/users/users';


@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',

})
export class LocationsPage extends BasePage {

  user: any;
  places: any = [];

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

  ) {
    super(toastCtrl, loadingCtrl, navCtrl);
  }


  ionViewDidEnter() {
    this.intializePage();

  }

  intializePage() {
    console.log("Locations Page");
    this.storage.get(Constants.storage.user).then(userU => {
      console.log('userU ', userU);
      this.user = userU;
      this.loadLocations();
    });
  }

  goToLocation() {
    this.navCtrl.push(LocationPage);
  }

  loadLocations() {
    this.usersProvider.getAllFilterAndSort({ user: this.user.user }, {}).then(userS => {
      console.log('userS ', userS)

      let userU = userS[0];

      console.log('userU ', userU)
      if (userU.places) {
        if (userU.places.length != 0) {

          this.places = userS[0].places;
        }
      }

    })
  }

  setActive(place) {

    this.usersProvider.getAllFilterAndSort({ id: this.user.id }, {}).then(userS => {

      let userU = userS[0];


      for (let i of this.places) {

        i.active = false;
        if (i.street === place.street) {
          i.active = true;
          console.log('encontré los iguales ', i)
        }
      }

      /// falta updatear
      let updatePlaces =
      {
        id: this.user.id,
        places: this.places,
      }

      /// replacing not updating
      this.usersProvider.update(updatePlaces).then(res => {
        console.log('user updated ', res)

      })

    })

  }

  deletePlace(place) {

    this.usersProvider.getAllFilterAndSort({ id: this.user.id }, {}).then(userS => {
      let userU = userS[0];

      for (let i of userU.places) {
        if (i.street == place.street) {
          let index = userU.places.indexOf(i);
          this.places.splice(index, 1);
        }
      }

      let updatePlaces =
      {
        id: this.user.id,
        places: this.places,
      }

      /// replacing not updating
      this.usersProvider.update(updatePlaces).then(res => {
        console.log('user updated ', res)

      })

    })

  }

}
