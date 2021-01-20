import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../app.constants';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable()
export class NotificationService extends BaseService{

  getApiEndPoint(){
    return Constants.API_METHOD_NOTIFICATIONS;
  }
  // login(values): Promise<any> {
  //   const URL = environment.serverUrl + Constants.API_METHOD_NOTIFICATIONS + '/login';
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post(URL, JSON.stringify(values), { headers: headers })
  //     .toPromise()
  //     .then(response =>
  //       response
  //     )
  //     .catch(this.handleError);
  // }
  
  sendPush(obj): Promise<any> {

    const url = Constants.PUSH_SERVER_URL;

    return this.http.post(url, obj)
      .toPromise()
      .then(response =>
        response.json()
      )
      .catch(this.handleError.bind(this));
  }

}
