import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Buwerk';
  innerHeight: number;
  public viewContainerRef: ViewContainerRef;

  constructor(
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.innerHeight = window.innerHeight
  }

  ngOnInit() {
  }

}
