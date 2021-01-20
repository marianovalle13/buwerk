import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../app.constants';
import { environment } from 'environments/environment';

@Injectable()
export class BaseService {

  constructor(
    public http: Http
  ) { }

  getApiEndPoint() {
    return '';
  }

  getAll(filters): Promise<any[]> {
    return this.getAllSorted(filters, { }, []);
  }

  getAllAndPopulate(filters, populates): Promise<any[]> {
    return this.getAllSorted(filters, { name: 1 }, populates)
  }

  getAllFilterSortAndPopulate(filter, sort, populate){
    return this.getAllSorted(filter, sort , populate)
  }

  getAllSorted(filters, pSort, populates): Promise<any[]> {

    let sort = {};
    if (pSort) {
      sort = pSort
    }

    const URL = environment.serverUrl + this.getApiEndPoint()
      + '/?_filters=' + encodeURI(JSON.stringify(filters))
      + '&sort=' + encodeURI(JSON.stringify(sort))
      + '&_populates=' + encodeURI(JSON.stringify(populates));

    console.log(URL);
    return this.http.get(URL)
      .toPromise()
      .then(response =>
        response.json() as any[]
      )
      .catch(this.handleError);
  }

  create(occurrence): Promise<any> {

    const url = environment.serverUrl + this.getApiEndPoint();

    return this.http.post(url, occurrence)
      .toPromise()
      .then(response =>
        response.json()
      )
      .catch(this.handleError.bind(this));
  }

  update(model): Promise<any> {

    const url = environment.serverUrl + this.getApiEndPoint() + '/' + model.id;

    return this.http.put(url, model)
      .toPromise()
      .then(response =>
        response.json()
      )
      .catch(this.handleError.bind(this));
  }
  remove(model): Promise<any> {

    const url = environment.serverUrl + this.getApiEndPoint() + '/' + model.id;

    return this.http.delete(url, model)
      .toPromise()
      .then(response =>
        response
      )
      .catch(this.handleError.bind(this));
  }

  getById(id): Promise<any> {
    const URL = environment.serverUrl + this.getApiEndPoint() + '/' + id;
    return this.http.get(URL)
      .toPromise()
      .then(response =>
        response.json()
      )
      .catch(this.handleError);
  }

  createFile(file): Promise<any> {

    const URL = environment.serverUrl + Constants.API_METHOD_FILES + '/upload'

    const fd = new FormData();
    fd.append('file', file);

    return this.http.post(URL, fd)
      .toPromise()
      .then(response =>
        response.json()
      )
      .catch(this.handleError);
  }


  deleteFiles(arr): Promise<any> {
    console.log('Files to delete: ', arr)
    const url = environment.serverUrl + Constants.API_METHOD_FILES + '/delete';
    const headers: any = {}
    const options = new RequestOptions({
      headers: headers,
      body: arr
    })
    return this.http.delete(url, options)
      .toPromise()
      .then(response => response)
      .catch(err => this.handleError.bind(err));
  }

  handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.body || error);
  }

}
