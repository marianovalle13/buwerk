import { Component, ViewChild, NgZone, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { BaseComponent } from '../base/base.component';
import { Constants } from '../app.constants';
import { environment } from 'environments/environment';
import { ProfesionalsService } from '../services/profesionals.service';
import { ProvincesService } from 'app/services/provinces.service';
import { CitiesService } from 'app/services/cities.service';
import { CountriesService } from 'app/services/countries.service';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.sass'],
  providers: [ProfesionalsService, ProvincesService, CitiesService, CountriesService],
})
export class ProfesionalComponent extends BaseComponent {

  // file: File;
  // image = '';
  // images = [];
  // filesUrl = environment.filesUrl;

  countriesArray: any = [];
  provincesArray: any = [];
  citiesArray: any = [];

  countriesToFilter: any;
  provincesToFilter: any;
  citiesToFilter: any;

  provincesDisabled = false;
  citiesDisabled = false;

  sex = Constants.sex;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public toastr: ToastsManager,
    public profesionalsService: ProfesionalsService,
    public provincesService: ProvincesService,
    public citiesService: CitiesService,
    public countriesService: CountriesService,
  ) {
    super(router, formBuilder, route, toastr, <BaseService>profesionalsService);

    this.loadCountries();
    this.loadProvinces();
    this.loadCities();

  }

  // ---- load items ----

  loadCountries() {
    this.countriesService.getAll({}).then(result => this.countriesArray = result)
  }

  loadProvinces(filter?) {
    let filters = {};
    if (filter) {
      filters = { 'country': filter }
    };

    this.provincesService.getAll(filters).then(result => {console.log("provinces:", result); this.provincesArray = result;})
  }

  loadCities(filter?) {
    let filters = {};
    if (filter) {
      filters = { 'province': filter }
    };

    console.log("filter city", filter)
    console.log("filters city", filters)

    this.citiesService.getAll(filters).then(result => {console.log("cities:", result); this.citiesArray = result;})
  }

  // --

  selectCountry(item) {
    console.log(item)
    this.countriesToFilter = item;
    console.log(this.countriesToFilter)
    this.provincesToFilter = null;
    this.citiesToFilter = null;
    this.provincesDisabled = true;
    this.provincesArray = [];
    this.citiesArray = [];
    this.loadProvinces(item);

  }

  selectProvince(item) {
    this.provincesToFilter = item;
    console.log(this.provincesToFilter)
    this.citiesToFilter = null;
    this.citiesDisabled = true;
    this.citiesArray = [];
    this.loadCities(item)
  }

  selectCity(item) {
    this.citiesToFilter = item;
  }

  getBasesURI() {
    return '/profesionals';
  }

  getFormNew() {
    return this.formBuilder.group({
      id:  [null],
      name:  [null],
      sex:  [null],
      cuit:  [null],
      dni:  [null],
      phone:  [null],
      jobZone:  [null],
      city:  [null],
      province:  [null],
      country: [null],
      birthDate:  [null],
      user:  [null],
      password:  [null],
      status:  [null],
    })
  }

  // onChange(event: EventTarget) {
  //   const eventObj: MSInputMethodContext = <MSInputMethodContext>event
  //   const target: HTMLInputElement = <HTMLInputElement>eventObj.target
  //   const files: FileList = target.files
  //   this.file = files[0]
  //   console.log('el Archivo es: ', this.file)
  //   this.articleService.createFile(this.file).then(data => {
  //     console.log(JSON.stringify(data))
  //     this.image = data.file
  //     console.log(this.image)
  //   })
  // }

  // onChangeSecondary(event: EventTarget) {
  //   const eventObj: MSInputMethodContext = <MSInputMethodContext>event
  //   const target: HTMLInputElement = <HTMLInputElement>eventObj.target
  //   const files: FileList = target.files
  //   this.file = files[0]
  //   console.log('el Archivo es: ', this.file)
  //   this.articleService.createFile(this.file).then(data => {
  //     console.log(JSON.stringify(data))
  //     this.images.push(data.file);
  //     console.log(this.images);
  //   })
  // }

  getFormEdit(item) {
    console.log('el item a editar: ', item);
    // this.image = item.image;
    // this.images = item.images;
    return this.formBuilder.group({
      id: [item.id],
      name: [item.name],
      sex: [item.sex],
      cuit: [item.cuit],
      dni: [item.dni],
      phone: [item.phone],
      jobZone: [item.jobZone],
      city: [item.city],
      province: [item.province],
      birthDate: [item.birthDate],
      user: [item.user],
      password: [item.password],
      status: [item.status],
      country: [item.country],
    });
  }

  logForm(values) {
    // if (!this.image) {
    //   this.showError("Debe seleccionar una imagen");
    //   return;
    // }
    // values.image = this.image;
    // values.images = this.images;
    console.log('logForm ', values);
    super.logForm(values);
  }

  // deleteImage(event: EventTarget) {
  //   console.log(event);
  //   const index = this.images.findIndex(el => el === event);
  //   //this.imagesToRemove.push(this.images.splice(index, 1)[0]);
  //   this.images.splice(index, 1);

  // }


}
