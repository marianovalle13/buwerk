import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { Constants } from '../../app/app.constants';

@Injectable()
export class ArticleProvider extends BaseProvider{

  getApiEndPoint(){
    return Constants.API_METHOD_ARTICLES;
  }

  getByUser(pUserId?,filters?){

    let userId = "-1"
    if(pUserId) {
      userId = pUserId;
    }

    if (filters.title) {  
      // filters.title = new RegExp(filters.title, 'i');
      filters.title = { "$regex": filters.title, "$options": "i" };
      console.log("RegExp", new RegExp(filters.title, 'i'))
    }

    console.log("filters.title", filters.title)

    var url = this.getServerUrl() + this.getApiEndPoint() 
      + "/user/" + userId + '?_filters=' + encodeURI(JSON.stringify(filters));

    console.log(url);

    return this.http.get(url)
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
    //  .catch(this.handleError.bind(this));
  }

}
