import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { Constants } from '../../app/app.constants';

@Injectable()
export class UserProfesionalProvider extends BaseProvider {

  getApiEndPoint() {
    return Constants.API_METHOD_USERPRO;
  }

}