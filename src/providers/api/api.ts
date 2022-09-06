import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http'
import { SERVER_URL } from '../environment/environment'
import { UtilProvider } from '../util/util';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class ApiProvider {

  constructor(
    public http: HttpClient,
    private util: UtilProvider,
    private authProvider: AuthProvider
  ) {}

  post(url, payload){
    return this.http.post(SERVER_URL + url, payload, {
      headers: new HttpHeaders().set('Authorization', this.authProvider.token)
    });
  }

  put(url, payload){
    return this.http.put(SERVER_URL + url, payload, {
      headers: new HttpHeaders().set('Authorization', this.authProvider.token)
    });
  }

  get(url){
    return this.http.get(SERVER_URL + url, {
      headers: new HttpHeaders().set('Authorization', this.authProvider.token)
    });
  }

  delete(url, payload){
    return this.http.delete(SERVER_URL + url + payload, {
      headers: new HttpHeaders().set('Authorization', this.authProvider.token)
    });
  }
}
