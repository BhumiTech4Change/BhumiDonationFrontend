import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public util: UtilProvider
  ) {  }

  ionViewDidLoad() {
    this.displayUserData()
  }

  public user:any = {
    name:"",
    email:"",
    phno:"",
    city:""
  }

  async displayUserData(){
    await this.util.getFromStorage("user").then((data:any)=>{
      this.user = data.user;
    })
  }
}
