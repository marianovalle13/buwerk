import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { Constants } from '../../app/app.constants';

@Injectable()
export class NotificationProvider extends BaseProvider{

  getApiEndPoint(){
    return Constants.API_METHOD_NOTIFICATIONS;
  }

  getByUser(pUserId?){

    let userId = "-1"
    
    if(pUserId) {
      userId = pUserId;
    }

    var url = this.getServerUrl() + this.getApiEndPoint()
            + "/user/" + userId;

    console.log(url);

    return this.http.get( url )
    .toPromise()
    .then(items =>{
        this.saveItems(items);
        return items as any[];
      }
    )
    .catch(response => {
      console.log(response);
      if(response.status == 0){
        return Promise.resolve(this.getItems());
      } else {
        return this.handleError(response);
      }
    });
  }


}
