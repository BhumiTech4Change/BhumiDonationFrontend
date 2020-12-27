import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http'
import { SERVER_URL } from '../environment/environment'
import { UtilProvider } from '../util/util';

@Injectable()
export class ApiProvider {

  constructor(
    public http: HttpClient,
    private util: UtilProvider,
  ) {
    console.log('Hello ApiProvider Provider');
  }
  
  public token:any = "";

  setAllKeys(){
    this.util.getAllKeysOfStorage().then((keys:any)=>{
      console.log("Keys in storage are: ",keys);
      for (let i = 0; i < keys.length; i++) {
        this.util.setToStorage(keys[i], null);
      }
    })
  }

  async getToken(){
    return await new Promise((resolve,reject)=>{
      this.util.getFromStorage("token").then((token:any)=>{
        // console.log("Token in api.ts is: ",token)
        if(token!=undefined){
          this.token = `Bearer ${token}`;
          resolve(this.token);
        }else{
          reject("Token not available")
        }
      })
    })
  }

  post(url, payload){
    return this.http.post(SERVER_URL + url, payload, {
      headers: new HttpHeaders().set('Authorization', this.token)
    });
  }

  put(url, payload){
    return this.http.put(SERVER_URL + url, payload, {
      headers: new HttpHeaders().set('Authorization', this.token)
    });
  }

  get(url){
    return this.http.get(SERVER_URL + url, {
      headers: new HttpHeaders().set('Authorization', this.token)
    });
  }

  delete(url, payload){
    return this.http.delete(SERVER_URL + url + payload, {
      headers: new HttpHeaders().set('Authorization', this.token)
    });
  }

}
