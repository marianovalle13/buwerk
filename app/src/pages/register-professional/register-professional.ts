import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, App, ModalController } from 'ionic-angular';
import { BasePage } from '../base/base';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PushProvider } from '../../providers/push/push';
import { Constants } from '../../app/app.constants';
import { LoginPage } from '../login/login';
import { ProfesionalProvider } from '../../providers/profesional/profesional';
import { UsersProvider } from '../../providers/users/users';
import { Storage } from '@ionic/storage';
import { PictureProvider } from "../../providers/picture/picture";
import { CountriesProvider } from "../../providers/countries/countries";
import { ProvincesProvider } from "../../providers/provinces/provinces";
import { CitiesProvider } from "../../providers/cities/cities";
import { GoogleService } from '../../providers/google';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { PopoverController } from 'ionic-angular';
import { TermsComponent } from '../../components/terms/terms';

@Component({
  selector: 'page-register-professional',
  templateUrl: 'register-professional.html',
  providers: [ProfesionalProvider, UsersProvider, PictureProvider, CountriesProvider, ProvincesProvider, CitiesProvider, GoogleService, NativeGeocoder, PushProvider]
})
export class RegisterProfessionalPage extends BasePage {

  form: FormGroup;

  user: any;

  morning = false;
  afternoon = false;
  night = false;

  image: any;

  ///
  countrySelected: any;
  countries: any;
  provinceSelected: any;
  provinces: any;
  citySelected: any;
  cities: any;

  termsAndConditions: boolean = false;

  constructor(
    public app: App,
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public profesionalsProvider: ProfesionalProvider,
    public userProvider: UsersProvider,
    public pictureProvider: PictureProvider,
    public countriesProvider: CountriesProvider,
    public provincesProvider: ProvincesProvider,
    public citiesProvider: CitiesProvider,
    public googleService: GoogleService,
    public nativeGeocoder: NativeGeocoder,
    public pushProvider: PushProvider,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController

  ) {
    super(toastCtrl, loadingCtrl, navCtrl);
    
    this.form = this.createForm();

    this.storage.get(Constants.storage.user).then(userS => {
      console.log('userS register pro', userS)

      if (userS) {
        console.log('userS ', userS);

        this.user = userS;
        console.log('this.user ', this.user);
        this.form = this.getFormEdit();

        console.log('this.form ', this.form);

        this.loadProfileImage()
      }

      this.getCountry();

    });

  }

  createForm() {
    return this.formBuilder.group({
      name: [null, Validators.required],
      sex: [null, Validators.required],
      // cuit: [null, Validators.required],
      // dni: [null, Validators.required],
      phone: [null, Validators.required],
      jobZone: [null],
      
      city: [null],
      province: [null],
      country: [null],
      
      user: [null, Validators.required],
      password: [null, Validators.required],
      status: [null],
      category: [null, Validators.required],
      image: [null],

      timeDisponibilityMorning: this.morning,
      timeDisponibilityAfternoon: this.afternoon,
      timeDisponibilityNight: this.night,

      priceStart: [null, Validators.required],
      priceEnd: [null, Validators.required],
      shortDesc: [null, Validators.required],
      desc: [null, Validators.required],

      address: [null, Validators.required],
      // latitude: [null, Validators.required],
      // longitude: [null, Validators.required],
    });
  }
  

  getFormEdit() {

    this.morning = this.user.timeDisponibilityMorning;
    this.afternoon = this.user.timeDisponibilityAfternoon;
    this.night = this.user.timeDisponibilityNight;

    return this.formBuilder.group({
      name: [this.user.name, Validators.required],
      sex: [this.user.sex, Validators.required],
      // cuit: [this.user.cuit, Validators.required],
      // dni: [this.user.dni, Validators.required],
      phone: this.user.phone,
      jobZone: this.user.jobZone,
      
      city: this.user.city,
      province: this.user.province,
      country: this.user.country,

      birthDate: this.user.birthDate,
      user: [this.user.user, Validators.required],
      password: [this.user.password],
      status: this.user.status,
      category: [this.user.category, Validators.required],
      image: this.user.image,

      priceStart: [this.user.priceStart, Validators.required],
      priceEnd: [this.user.priceEnd, Validators.required],
      shortDesc: [this.user.shortDesc, Validators.required],
      desc: [this.user.desc, Validators.required],

      timeDisponibilityMorning: [null],
      timeDisponibilityAfternoon: [null],
      timeDisponibilityNight: [null],
      
      address: [this.user.address, Validators.required],
      // latitude: [this.user.latitude, Validators.required],
      // longitude: [this.user.longitude, Validators.required],

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

  register() {
    console.log('register')
    this.showLoading("");
    let user = this.form.value;

    user.timeDisponibilityMorning = this.morning;
    user.timeDisponibilityAfternoon = this.afternoon;
    user.timeDisponibilityNight = this.night;

    console.log('user ', user);

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.citiesProvider.getById(this.form.value.city)
      .then( city => {
        console.log('city ', city);
        console.log('user.address ' ,user.address)

        let place = city['name'] + ' ,' + user.address;
        
        this.nativeGeocoder.forwardGeocode(place, options)
          .then((coordinates: NativeGeocoderForwardResult[]) => {
            console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude);
            user.latitude = coordinates[0].latitude;
            user.longitude = coordinates[0].longitude;
    
            //// ---- 
    
            if (this.user) {
              this.userProvider.getAllFilterAndSort({ user: user.user }, {}).then(res => {
                console.log('res ', res);
                if (res.length > 0) {
                  this.showError("Ese mail ya está usado");
                } else {
                  console.log('user ', user);
                  console.log('this.user ', this.user);
                  if(!user.password) {
                    delete user['password'];
                  }
                  //// --- actualizar
                  user.id = this.user.id;
                  this.profesionalsProvider.update(user)
                    .then(u => {
                      console.log('create', u)
                      user = u;
                      this.storage.remove(Constants.storage.user).then(userS => {
                        this.storage.set(Constants.storage.user, u);
                      });
                    })
                    .then(() => {
                      this.showSuccess("Usuario actualizar con Exito!");
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
                this.userProvider.getAllFilterAndSort({ user: user.user }, {}).then(res => {
                  console.log('res ', res);
                  if (res.length > 0) {
                    this.showError("Ese mail ya está usado");
                  } else {
                      // creating
                      this.profesionalsProvider.create(user)
                        .then(u => {
                          console.log('created user ', u)
                          user = u;
                          // this.storage.set(Constants.storage.user, u); //// commented for status
                        })
                        .then(() => {
                          this.showSuccess("Usuario registrado con Exito!");
                          // this.navCtrl.setRoot(TabsPage, {
                          //   pro: 'pro'
                          // }) //// commented for status
                          this.navCtrl.setRoot(LoginPage)

                          //// push notification
                          this.storage.get(Constants.storage.user).then( res => {

                            const userPush = {
                              userApp: res.id
                            };
                            this.pushProvider.enablePN(userPush);
                            this.showMessage('Bienvenido!', '');

                        })
                        })
                        .catch(error => {
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
          }).catch( error => {
            console.log('error ', error);
            this.showError('Error: '+ error);
          })
      })

  }

  logOut() {
    console.log("Back to Login");

    this.storage.get(Constants.storage.user).then( userS => { 
      this.pushProvider.unregisterPN(userS.id);
      this.storage.remove(Constants.storage.user).then( del => {
        this.app.getRootNav().setRoot(LoginPage);
      });
    })
  }

  goToProfessionalTabs() {
    this.navCtrl.setRoot(TabsPage, {
      pro: 'pro'
    })

  }

  checkBoxTime(event, value) {
    console.log('event ', event)
    console.log('value ', value)

    switch (value) {
      case 'mañana':
        this.morning= event.value;
        console.log('event.value ', event.value)
        console.log('this.morning ', this.morning)

        break;
      case 'tarde':
        this.afternoon= event.value;
        break;
      case 'noche':
        this.night= event.value;
        break;
    }

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

    this.provincesProvider.getAllFilterAndSort({ country : id }, {}).then(res => {
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
    this.citiesProvider.getAllFilterAndSort({ province : id }, {}).then(res => {
      console.log('citiesProvider res ', res)
      this.cities = res;
      console.log(this.cities);
    })
  }

  //// ---- FUNCTIONS FOR PROFILE IMAGE

  //Upload de imágen

  loadImage() {
    this.pictureProvider.selectSource(this, 'PROFILE');
  }

  loadProfileImage() {
    if (this.form.value.image) {
      this.image = Constants.FILES_BASE_URL + '/' + this.form.value.image;
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
    // const popover = this.popoverCtrl.create(TermsComponent);
    // popover.present();
    const modal = this.modalCtrl.create(TermsComponent,{},{cssClass:"terms-modal"});
    modal.present();
  }
}
