import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { Constants } from '../../app/app.constants';

@Injectable()
export class MPProvider extends BaseProvider{

  getApiEndPoint(){
    return Constants.API_METHOD_MP;
  }

  getSubscriptionInitPoint(user) {
    var url = this.getServerUrl() + this.getApiEndPoint() + "/subscription/initPoint";

    return this.http.post(url,user)
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(this.handleError.bind(this));
  }

  getArticleInitPoint(user,article) {
    var url = this.getServerUrl() + this.getApiEndPoint() + "/article/initPoint";

    let params = user;
    params.article = article;
    // if(article.price)
    //   params.article.ammount = article.price;

    return this.http.post(url,params)
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(this.handleError.bind(this));
  }

}
