import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import 'rxjs/add/operator/map';
import { WorkServicesService } from '../services/work-services.service';
import { ToastsManager } from 'ng2-toastr';
import { BasesComponent } from '../bases/bases.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CitiesService } from '../services/cities.service';
import { ProvincesService } from '../services/provinces.service';
import { CountriesService } from '../services/countries.service';
import { FormBuilder, Validators } from '@angular/forms';

// TODO: At changing country cities dont update. Ask for confirmtion to delete

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  providers: [WorkServicesService, NgbModal, CountriesService, CitiesService, ProvincesService]
})
export class PlacesComponent {

  closeResult: string;
  itemSelected: any = {};

  countriesArray: any = [];
  provincesArray: any = [];
  citiesArray: any = [];

  citiesForm: any;
  provincesForm: any;
  countriesForm: any;

  countriesToFilter: any = null;
  provincesToFilter: any = null;
  citiesToFilter: any = null;

  selected: boolean = true;

  constructor(
    public router: Router,
    public workServicesService: WorkServicesService,
    public toastr: ToastsManager,
    private modalService: NgbModal,
    public citiesService: CitiesService,
    public provincesService: ProvincesService,
    public countriesService: CountriesService,
    public formBuilder: FormBuilder,
  ) {
    this.loadCountries();
    this.loadProvinces();
    this.loadCities();

    // ---- creating forms ----

    this.citiesForm = this.formBuilder.group({
      name: [null, Validators.required],
      province: [null],
      country: [null],
    })

    this.provincesForm = this.formBuilder.group({
      name: [null, Validators.required],
      country: [null],
    })

    this.countriesForm = this.formBuilder.group({
      name: [null, Validators.required],
    })

    console.log(this.countriesToFilter);
  }

  // ---- selecing list items ----

  selectCountry(item){
    this.countriesArray.forEach(element => {
      element.selected = false;
    });
    item.selected = true;
    this.countriesToFilter = item;
    console.log(this.countriesToFilter)
    this.provincesToFilter = null;
    this.citiesToFilter = null;
    this.provincesArray = [];
    this.citiesArray = [];
    this.loadProvinces(item)
  }

  selectProvince(item) {
    this.provincesArray.forEach(element => {
      element.selected = false;
    });
    item.selected = true;
    this.provincesToFilter = item;
    console.log(item)
    this.citiesToFilter = null;
    this.citiesArray = [];
    this.loadCities(item)
  }

  selectCity(item) {
    this.citiesArray.forEach(element => {
      element.selected = false;
    });
    item.selected = true;
    this.citiesToFilter = item;
  }

  // ---- gets ----

  getBaseURI() {
    return '/services';
  }

  getPopulates() {
    return ['city', 'province'];
  }

  // ---- load items ----

  loadCountries(filter?) {
    let filters = {};
    // if (filter) {filters = filter};

    this.countriesService.getAll(filters).then( result => this.countriesArray = result)
  }

  loadProvinces(filter?) {
    let filters = { };
    if (filter) {
      filters = { 'country': filter.id }
    };

    this.provincesService.getAll(filters).then( result => this.provincesArray = result)
  }

  loadCities(filter?) {
    let filters = { };
    if (filter) {
      filters = { 'province': filter.id }
    };

    this.citiesService.getAll(filters).then( result => this.citiesArray = result)
  }

  // ---- saving items ----

  logCountries(values) {
    this.countriesService.create(values).then(done => { console.log(done); this.loadCountries(); })
  }

  logProvinces(values) {

    if (this.countriesToFilter) {
      console.log(this.countriesToFilter)
      let valuesProvince = {
        name: values.name,
        country: this.countriesToFilter.id,
      }
      this.provincesService.create(valuesProvince).then(done => { console.log(done); this.loadProvinces(this.countriesToFilter.id); })
    } else {
      this.toastr.warning('Debe seleccionar un país')
    }
  }

  logCities(values) {
    console.log(this.provincesToFilter)
    if (this.provincesToFilter) {

      let valuesCity = {
        name: values.name,
        country: this.countriesToFilter.id,
        province: this.provincesToFilter.id
      }

      this.citiesService.create(valuesCity).then(done => { console.log(done); this.loadCities(this.provincesToFilter.id);  })
    } else {
      this.toastr.warning('Debe seleccionar una provincia')
    }
  }

  // ---- deleting items ----

  deleteCountries() {
    // this.countriesService.remove(this.countriesToFilter).then(done => { console.log(done); this.loadCountries(); })

    // deleting country
    this.countriesService.remove(this.countriesToFilter)
      .then(done => {
        this.loadCountries();
        this.countriesToFilter = {};
        // getting provinces to delete
        this.provincesService.getAll({ 'country': this.countriesToFilter.id })
          .then(provinceToRemove => {
            for (let o of provinceToRemove) {
              // deleting provinces
              this.provincesService.remove(o)
                .then(done => {
                  this.loadProvinces();
                  this.provincesToFilter = {};
                  // getting cities to delete
                  this.citiesService.getAll({ 'country': this.countriesToFilter.id })
                    .then(cityToRemove => {
                      for (let i of cityToRemove) {
                        // deleting cities
                        this.citiesService.remove(i)
                          .then(done => {
                            this.loadCities();
                            this.citiesToFilter = {};
                          }).catch(e => console.log(e))
                      }
                    }).catch(e => console.log(e))
                }).catch(e => console.log(e))
            } // endfor
          }).catch (e => console.log(e))
      }).catch (e => console.log(e))

  }

  deleteProvinces() {

    // deleting province
    this.provincesService.remove(this.provincesToFilter)
      .then(done => {
        this.loadProvinces();
        this.provincesToFilter = {};
        // getting cities to delete
        this.citiesService.getAll({ 'province': this.provincesToFilter.id })
          .then(cityToRemove => {
            for (let i of cityToRemove) {
              // deleting cities
              this.citiesService.remove(i)
                .then(done => {
                  this.loadCities();
                  this.citiesToFilter = {};
                }).catch(e => console.log(e))
            } // endfor
          }).catch(e => console.log(e))
      }).catch(e => console.log(e))
  }

  deleteCities() {
    this.citiesService.remove(this.citiesToFilter).then(done => { console.log(done); this.loadCities(); })
  }

  // ---- opening modals ----

  // open(content, item) {
  open(content) {
    console.log(this.countriesToFilter, ' ', this.provincesToFilter)
    // this.itemSelected = item;
    this.modalService.open(content, {}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
