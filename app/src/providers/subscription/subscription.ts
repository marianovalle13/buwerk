import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { Constants } from '../../app/app.constants';

@Injectable()
export class SubscriptionProvider extends BaseProvider{

  getApiEndPoint(){
    return Constants.API_METHOD_SUBSCRIPTIONS;
  }

  getByUser(pUserId){

    var url = this.getServerUrl() + this.getApiEndPoint()
            + "/?_filters=" + encodeURI(JSON.stringify({user:pUserId}));

    console.log(url);

    return this.http.get( url )
    .toPromise()
    .then((items:any) =>{
        let subs;
        if(items.length == 1) subs = items[0];
        return subs;
      }
    )
    .catch(this.handleError.bind(this));

  }


}
