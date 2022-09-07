import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SERVER_URL } from '../environment/environment'

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {}

  post(url, payload){
    return this.http.post(SERVER_URL + url, payload);
  }

  put(url, payload){
    return this.http.put(SERVER_URL + url, payload);
  }

  get(url){
    return this.http.get(SERVER_URL + url);
  }

  delete(url, payload){
    return this.http.delete(SERVER_URL + url + payload);
  }
}
