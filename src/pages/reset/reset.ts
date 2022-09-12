import { Component } from '@angular/core';
import { IonicPage, NavController ,MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../providers/environment/environment'
import { UtilProvider } from '../../providers/util/util';
import { AuthPage } from "../auth/auth";

export interface User {
  email: string
}

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html'
})
export class ResetPage {

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private http: HttpClient,
    private util: UtilProvider,
  ) { this.menuCtrl.enable(false, 'myMenu'); }

  public user: User = {
    email : ""
  }

  public isValidEmail: boolean = false;

  validateEmail(userData) {
    const emailRegex = /\S+@\S+\.\S+/;
    this.isValidEmail = emailRegex.test(userData);
  }

  reset(user) {
    this.http.post(`${SERVER_URL}/api/auth/forgotPassword`,{
      email: user.email
    }).subscribe(async (res: any) => {
      this.util.presentAlertWithCallback("Password reset email sent",
        "Please follow the instructions on email to reset the password",
        () => this.navCtrl.setRoot(AuthPage));
    },(err) => {
      this.util.presentAlert("Invalid Credentials","You have entered an incorrect email!");
    })
  }
}
