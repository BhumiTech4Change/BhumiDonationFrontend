import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public util: UtilProvider,
    public auth: AuthProvider,
    public navCtrl: NavController
  ) {  }

  ionViewDidLoad() {
    this.user = this.auth.user;
  }

  ionViewCanEnter(): boolean | Promise<any> {
    return this.auth.isAuthenticated();
  }

  public user: any = {
    name: "",
    email: "",
    phno: "",
    city: ""
  }
}
