import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'terms',
  templateUrl: 'terms.html'
})
export class TermsComponent {

  text: string;

  constructor(
    public viewCtrl: ViewController
    ) {
    console.log('Hello TermsComponent Component');
    this.text = 'Hello World';
  }

  close() {
    this.viewCtrl.dismiss();

  }

}
