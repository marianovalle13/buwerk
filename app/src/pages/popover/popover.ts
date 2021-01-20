import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { Constants } from "../../app/app.constants";

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-popover",
  templateUrl: "popover.html"
})
export class PopoverPage {
  categories: any = [
    'Hogar',
    'Mantenimiento',
    'Jardinería',
    'Cuidados personales',
  ];
  
  filterSelected: any;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
  ) {

    console.log('Hello FilterPopoverComponent Component');
    this.filterSelected = navParams.get('filterSelected');
    
  }

  close(data) {
    this.viewCtrl.dismiss(data);
  }

  markSelected() {

    this.categories.forEach(element => {
      console.log('element -----', element)
      element.selected = false;
      if (element.id == this.filterSelected.id) {
        element.selected = true;
      }
      
    });
    
  }
}

