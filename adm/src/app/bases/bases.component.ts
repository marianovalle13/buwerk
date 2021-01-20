import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.sass']
})
export class BasesComponent implements OnInit {
  items = [];
  textSearch: any = '';
  loading = true;

  getBaseURI() {
    return '';
  }

  constructor(
    public router: Router,
    public baseService: BaseService,
    public toastr: ToastsManager
  ) {
  }
  edit(item) {
    this.router.navigate([this.getBaseURI() + '/' + item.id]);
  }

  remove(item) {
    if (!confirm('¿Esta seguro que desea eliminar este elemento?')) {
      return
    }
    this.baseService.remove(item)
      .then(data => {
        this.getItems({});
        this.showSuccess('se elimino correctamente')
        this.deleteAllFiles(item)
      })
      .catch(err => {
        this.showError('no se pudo eliminar el item')
        this.getItems({});
      })
  }

  deleteAllFiles(item) {

  }

  deleteFile(arr) {
    this.baseService.deleteFiles(arr)
      .then(res => {
        this.showSuccess('se elimino correctamente')
      })
      .catch(err => {
        this.showError('no se pudo eliminar el item')
      })
  }


  create() {
    this.router.navigate([this.getBaseURI() + '/new']);
  }

  getFiltersSearch(textSearch) {
    const filters: any = { name: textSearch };
    return filters;
  }

  search() {
    const ts = this.textSearch.trim();
    let filters: any = {};
    if (ts !== '') {
      filters = this.getFiltersSearch(this.textSearch);
    }
    this.getItems(filters);
  }


  ngOnInit() {
    this.getItems({});
  }

  getItems(filters) {
    console.log('get items')
    let filt =filters || this.getFilters();
    this.loading = true;
    this.baseService.getAllFilterSortAndPopulate(filt ,this.getSorted(), this.getPopulates()).then(items => {
      this.items = items;
      this.getItemSuccess();
      this.loading = false;
      console.log(items);
    })
  }

  getItemSuccess() {
  }

  getPopulates() {
    return [];
  }

  getFilters() {
    return {};
  }

  getSorted(){
    return {}
  }

  showSuccess(message) {
    this.toastr.success(message);
  }

  showError(message) {
    this.toastr.error(message);
  }

}
