import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../app.constants';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service';

@Injectable()
export class CitiesService extends BaseService {

  getApiEndPoint() {
    return Constants.API_METHOD_CITIES;
  }

}
