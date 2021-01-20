import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { Constants } from '../../app/app.constants';

@Injectable()
export class UserProvider extends BaseProvider {

  getApiEndPoint() {
    return Constants.API_METHOD_USERS;
  }

  login(user) {
    var url = this.getServerUrl() + this.getApiEndPoint() + "/login";

    return this.http.post(url, user)
      .toPromise()
      .then(response => {
        var r: any = response;
        if (r.errors) {
          return Promise.reject(r.errors[0].message);
        }

        return response;
      })
      .catch(this.handleError.bind(this));
  }

}