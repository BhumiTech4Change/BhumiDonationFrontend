import { Injectable } from '@angular/core';
import { UtilProvider } from '../util/util';
// import { ApiProvider } from '../api/api';

@Injectable()
export class AuthProvider {

  constructor(private util: UtilProvider) {}

  public user:any = {
    name:'',
    email:'',
    phno:'',
    city:''
  }

  public loggedIn:boolean = false;

  async openProfile(path:any) {
    if(path!=""){
     await this.util.getFromStorage('user').then((data:any)=>{
        this.user.name = data.user.name;
        this.user.email = data.user.email;
        this.user.phno = data.user.phno;
        this.user.city = data.user.city;
      })
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }
  }
}
