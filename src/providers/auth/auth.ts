import { Injectable } from '@angular/core';
import { UtilProvider } from '../util/util';
import { NavController } from "ionic-angular";
import { AuthPage } from "../../pages/auth/auth";

@Injectable()
export class AuthProvider {

  constructor(private util: UtilProvider) {}

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
    this.token = `Bearer ${token}`;
    return this.util.setToStorage("token", token);
  }

  setUser(user) {
    this.user = user;
    return this.util.setToStorage("user", user);
  }

  isAuthenticated(nav: NavController): boolean | Promise<any> {
    return this.util.getFromStorage("token").then(token => {
      if (token == null) {
        setTimeout(() => { nav.setRoot(AuthPage) }, 0);
        return false
      } else {
        this.token = `Bearer ${token}`;
        this.loadUser();
        return true
      }
    }).catch(() => {
      setTimeout(() => { nav.setRoot(AuthPage) }, 0);
      return false
    });
  }

  logout(): boolean | Promise<any> {
    this.token = null;
    return this.util.setToStorage("token", null);
  }
}
