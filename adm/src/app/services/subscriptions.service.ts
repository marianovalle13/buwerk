import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { BaseService } from './base.service';

@Injectable()
export class SubscriptionsService extends BaseService {

  getApiEndPoint() {
    return Constants.API_METHOD_SUBSCRIPTIONS;
  }
}
