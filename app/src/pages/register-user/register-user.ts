import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, App, ModalController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserProvider } from '../../providers/user/user';
// import { SubscriptionProvider } from '../../providers/subscription/subscription';
import { Storage } from '@ionic/storage';
import { Constants } from '../../app/app.constants';
import { LoginPage } from '../login/login';
import { UsersProvider } from '../../providers/users/users';
import { ProfesionalProvider } from '../../providers/profesional/profesional';
import { PictureProvider } from "../../providers/picture/picture";
import { CountriesProvider } from "../../providers/countries/countries";
import { ProvincesProvider } from "../../providers/provinces/provinces";
import { CitiesProvider } from "../../providers/cities/cities";
import { PushProvider } from '../../providers/push/push';
import { AlertController } from 'ionic-angular';

import { PopoverController } from 'ionic-angular';
import { TermsComponent } from '../../components/terms/terms';


@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
  providers: [UsersProvider, ProfesionalProvider, CountriesProvider, ProvincesProvider, CitiesProvider, PictureProvider, PushProvider]
})
export class RegisterUserPage extends BasePage {

  user: any;

  form: FormGroup;

  ///
  countrySelected: any;
  countries: any;
  provinceSelected: any;
  provinces: any;
  citySelected: any;
  cities: any;

  ///
  image: any;

  termsAndConditions: boolean = false;

  constructor(
    public app: App,
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public userProvider: UsersProvider,
    public profesionalsProvider: ProfesionalProvider,
    public pictureProvider: PictureProvider,
    public countriesProvider: CountriesProvider,
    public provincesProvider: ProvincesProvider,
    public citiesProvider: CitiesProvider,
    public pushProvider: PushProvider,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
    super(toastCtrl, loadingCtrl, navCtrl);

    this.form = this.createForm();

    this.storage.get(Constants.storage.user).then(userS => {

      if (userS) {
        console.log('userS ', userS);
        this.user = userS;
        console.log('this.user ', this.user);
        this.form = this.getFormEdit();
        this.loadProfileImage();

      }

      this.getCountry();

    });

  }

  createForm() {
    return this.formBuilder.group({
      name: [null, Validators.required],
      sex: [null],
      phone: [null, Validators.required],
      user: [null, Validators.required],
      password: [null, Validators.required],
      // birthDate: [null],-
      city: [null],
      province: [null],
      country: [null],
      image: [null]
    });
  }

  getFormEdit() {
    return this.formBuilder.group({
      name: [this.user.name, Validators.required],
      sex: [this.user.sex],
      phone: [this.user.phone, Validators.required],
      user: [this.user.user, Validators.required],
      password: [this.user.password],
      city: [this.user.city],
      province: [this.user.province],
      country: [this.user.country],
      image: [this.user.image]
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');

  }

  showLogin(){
    this.navCtrl.pop();
  }

  // register(){
  //   if(this.validatePassword())
  //     this.registerUser();
  // }

  // validatePassword() {
  //   if(this.form.value.password != this.form.value.repassword){
  //     this.showError("El password debe coincidir");
  //     return false;
  //   }

  //   if(this.form.value.password.length < 6){
  //     this.showError("El password debe tener al menos 6 caracteres");
  //     return false;
  //   }

  //   return true;
  // }

  // registerUser() {
  register() {
    console.log('register user')
    this.showLoading("");
    let user = this.form.value;

    console.log('register', user)
    if(this.user) {
      this.profesionalsProvider.getAllFilterAndSort({ user: user.user }, {}).then(res => {
        console.log('res ', res);
        if (res.length > 0) {
          this.showError("Ese mail ya está usado");
        } else {
          if(!user.password) {
            delete user['password'];
          }
          //// --- actualizar
          user.id = this.user.id;
          this.userProvider.update(user)
            .then(u => {
              console.log('create')
              user = u;
              this.storage.remove(Constants.storage.user).then(userS => {
                this.storage.set(Constants.storage.user, u);
              });
            })
            .then(() => {
              this.showSuccess("Usuario actualizar con Exito!");

              this.navCtrl.setRoot(TabsPage, {
                user: 'user'
              });
            })
            .catch(error => {
                this.showError("No se puede actualizar");
            })
            .then(() => {
              this.hideLoading();
            });
          }
       })
      } else {
        if(this.termsAndConditions) {
          //// --- registrar
          this.profesionalsProvider.getAllFilterAndSort({ user: user.user }, {}).then(res => {
    
            console.log('res ', res);
    
            if (res.length > 0) {
    
              this.showError("Ese mail ya está usado");
    
            } else {
              //creating user
              this.userProvider.create(user)
                .then(u => {
                  console.log('create')
                  user = u;
                  this.storage.set(Constants.storage.user, u);
                })
                .then(() => {
                  this.showSuccess("Usuario registrado con Exito!");
    
                  //// ---- todo go to SERVICES PAGE
                  this.navCtrl.setRoot(TabsPage, {
                    user: 'user'
                  });
                  //// push notification
                  this.storage.get(Constants.storage.user).then( res => {
    
                    const userPush = {
                      userApp: res.id
                    };
                    this.pushProvider.enablePN(userPush);
                    this.showMessage('Bienvenido!', '');
                })
              }).catch(error => {
                if (error == "ValidationError")
                  this.showError("No se puede registrar porque el email ya existe.");
                else
                  this.showError("No se puede registrar");
              })
              .then(() => {
                this.hideLoading();
              });
          }
        })
      } else {
        this.showError("Debes aceptar los términos y condiciones");
      }
    }  
  }


  goToLogin() {
    this.app.getRootNav().setRoot(LoginPage);
  }

  goToUserTabs() {
    this.navCtrl.setRoot(TabsPage, {
      user: 'user'
    })
  }

  //// ---- FUNCTIONS FOR LOCATIONS

  getCountry() {
    console.log('getCountry() ')

    this.countriesProvider.getAll().then(res => {
      this.countries = res;
      console.log('this.countries ', this.countries);
      if (this.form.controls['country'].value) {
        this.gerProvince(this.user.country)
      }
    })

  }

  onChangeCountry() {
    this.gerProvince(this.form.controls['country'].value);
    this.form.controls['province'].setValue(null);
    this.form.controls['city'].setValue(null);
    this.cities = [];
  }


  gerProvince(id) {
    console.log('gerProvince(id) ', id)

    this.provincesProvider.getAllFilterAndSort({ country: id }, {}).then(res => {
      console.log('provincesProvider res ', res)
      this.provinces = res;
      if (this.form.controls['province'].value) {
        this.getCity(this.form.controls['province'].value)
      }
      console.log('this.provinces ', this.provinces);

    })

  }

  onChangeProvince() {
    console.log('onChangeProvince')
    this.getCity(this.form.controls['province'].value);
  }

  getCity(id) {
    this.citiesProvider.getAllFilterAndSort({ province: id }, {}).then(res => {
      console.log('citiesProvider res ', res)
      this.cities = res;
      console.log('this.cities ', this.cities);
    })
  }

  //// ---- FUNCTIONS FOR PROFILE IMAGE

  //Upload de imágen

  loadImage() {
    this.pictureProvider.selectSource(this, 'PROFILE');
  }

  loadProfileImage() {
    console.log('Constants.FILES_BASE_URL ', Constants.FILES_BASE_URL);
    console.log(' this.form.value.image ', this.form.value.image);

    if (this.form.value.image) {
      this.image = Constants.FILES_BASE_URL + '/' + this.form.value.image;
      console.log('this.image ', this.image);
    }
  }


  setImageSrcLocal(imageSrc, imageType, filename) {
    this.image = filename;
  }

  setImageSrc(imageSrc, imageType) {
    this.image = imageSrc;
    var is = imageSrc.split('/');
    this.form.controls['image'].setValue(is[is.length - 1]);
  }
  
  goBack() {
    this.navCtrl.pop();
  }

  //

  openAgbPage() {
    console.log('this.termsAndConditions ', this.termsAndConditions)
    //const popover = this.popoverCtrl.create(TermsComponent, {}, { cssClass: "terms-modal" });
    //popover.present();
    const modal = this.modalCtrl.create(TermsComponent, {}, { cssClass: "terms-modal" });
    modal.present();
  }
  
}
