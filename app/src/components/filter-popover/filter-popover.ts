import { Component } from '@angular/core';
import { Constants } from '../../app/app.constants';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FilterPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filter-popover',
  templateUrl: 'filter-popover.html'
})
export class FilterPopoverComponent {
  categories: any = Constants.CATEGORIES;
  filterSelected: any;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams
    ) {
    console.log('Hello FilterPopoverComponent Component');
    this.filterSelected = navParams.get('filterSelected');
    console.log(this.filterSelected);
    this.markSelected();
  }
  
  close(data) {
    this.viewCtrl.dismiss(data);
  }

  markSelected(){
    this.categories.forEach(element => {
      element.selected = false;
      if (element.id == this.filterSelected) {
        element.selected = true;
      }
    });
  }

}
