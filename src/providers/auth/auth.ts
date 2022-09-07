import { Injectable } from '@angular/core';
import { App } from 'ionic-angular';

import { UtilProvider } from '../util/util';
import { AuthPage } from "../../pages/auth/auth";

@Injectable()
export class AuthProvider {

  constructor(private util: UtilProvider,
              private app: App) {}

  public user: any = {
    name:'',
    email:'',
    phno:'',
    city:''
  }

  async loadUser() {
    await this.util.getFromStorage('user').then((data:any)=>{
      this.user.name = data.user.name;
      this.user.email = data.user.email;
      this.user.phno = data.user.phno;
      this.user.city = data.user.city;
    })
  }

  public token: any = "";

  setToken(token) {
    this.token = token;
    return this.util.setToStorage("token", token);
  }

  setUser(user) {
    this.user = user;
    return this.util.setToStorage("user", user);
  }

  isAuthenticated(): boolean | Promise<any> {
    return this.util.getFromStorage("token").then(token => {
      if (token == null) {
        setTimeout(() => { this.app.getActiveNav().setRoot(AuthPage) }, 0);
        return false
      } else {
        this.token = token;
        this.loadUser();
        return true
      }
    }).catch(() => {
      setTimeout(() => { this.app.getActiveNav().setRoot(AuthPage) }, 0);
      return false
    });
  }

  logout(): boolean | Promise<any> {
    this.token = null;
    this.util.setToStorage("token", null);
    return this.app.getActiveNav().setRoot(AuthPage);
  }
}
