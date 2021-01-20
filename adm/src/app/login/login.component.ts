import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateHeaderService } from '../services/update-header.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { environment } from '../../environments/environment';
import { Constants } from '../app.constants';
import { AdministratorService } from '../services/administrator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [AdministratorService]
})
export class LoginComponent implements OnInit {
  formObject: any = { value: null };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public administratorService: AdministratorService,
    private sharedData: UpdateHeaderService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.formObject = this.formBuilder.group({
      user: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }
  logForm(values) {
    console.log(JSON.stringify(values));
    // const service = this.administratorService;

    this.administratorService.login(values).then(data => {
      console.log('service login')
      let response: any;
      response = data.json();
      console.log('response ', response);
      if (!response.errors) {
        this.showSuccess('Bienvenido');
        // Constants.IS_ADMIN_LOGIN = true;
        // this.sharedData.changeIsLogin(true);
        localStorage.setItem(Constants.storage.user, response._id);
        localStorage.setItem(Constants.storage.user, response.user);

        this.sharedData.changeIsLogin(true);

        const self = this;
        setTimeout(function () {
          self.router.navigate(['/']);
        }, 1500);
      } else {
        console.log("error");
        this.showError(response.errors[0].message);
      }
    })
  }
  showSuccess(message) {
    this.toastr.success(message);
  }
  showError(message) {
    this.toastr.error(message);
  }

}
