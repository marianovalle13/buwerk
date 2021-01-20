import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../app/app.constants';
import { BaseProvider } from '../base/base';
import { Storage } from '@ionic/storage';

@Injectable()
export class ValidatorProvider extends BaseProvider {

  // getApiEndPoint() {
  //   return Constants.API_METHODS.validators;
  // }

  // getQuestions(cuit) {
  //   console.log(`getQuestions `, cuit);

  //   return this.getRegisterAuthParams()
  //     .then(authParams => {
  //       const url = this.getServerUrl()
  //                 + this.getApiEndPoint()
  //                 + "/" + cuit
  //                 + "?"
  //                 + authParams;
  //       console.log(url);
  //       return this.http.get(url)
  //         .toPromise()
  //         .then((res: any) => {
  //           return Promise.resolve(res)
  //         })
  //         .catch(error => this.handleError(error));
  //     });
  // }

  // validate(method,type,params) {
  //   console.log(`type `, type);
  //   console.log(`params `, params);

  //   let queryParams = Object.keys(params).map(function (k) {
  //     return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
  //   }).join('&');


  //   return this.getRegisterAuthParams()
  //     .then(authParams => {
  //       const url = this.getServerUrl()
  //                 + this.getApiEndPoint()
  //                 + "/" + type
  //                 + "?"
  //                 + authParams
  //                 + "&"
  //                 + queryParams;
  //       console.log(url);

  //       this.httpx.setDataSerializer('json');
  //       this.httpx.setRequestTimeout(180);
  //       // this.httpx.setDataSerializer('urlencoded');

  //       if(method == 'put'){
  //         return this.httpx.put(url,{},{})
  //           .then(response => {
  //             return Promise.resolve(JSON.parse(response.data));
  //           })
  //           .catch(error => {
  //             return Promise.reject(JSON.parse(error.error));
  //           });
  //       } else if(method == 'post'){
  //         return this.httpx.post(url,{},{})
  //           .then(response => {
  //             return Promise.resolve(JSON.parse(response.data));
  //           })
  //           .catch(error => {
  //             return Promise.reject(JSON.parse(error.error));
  //           });
  //         } else {
  //           return this.httpx.get(url,{},{})
  //             .then(response => {
  //               return Promise.resolve(JSON.parse(response.data));
  //             })
  //             .catch(error => {
  //               return Promise.reject(JSON.parse(error.error));
  //             });
  //       }


  //     });
  // }

}
