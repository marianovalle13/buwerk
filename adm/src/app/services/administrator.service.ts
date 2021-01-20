import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../app.constants';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable()
export class AdministratorService extends BaseService{

  getApiEndPoint(){
    return Constants.API_METHOD_ADMINISTRATORS;
  }
  login(values): Promise<any> {
    const URL = environment.serverUrl + Constants.API_METHOD_ADMINISTRATORS + '/login';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(URL, JSON.stringify(values), { headers: headers })
      .toPromise()
      .then(response =>
        response
      )
      .catch(this.handleError);
  }

}
