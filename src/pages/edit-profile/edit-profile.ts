import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private util: UtilProvider
  ){ }

  public userCurrentData:any = {
    name:"",
    email:"",
    phno:"",
    city:""
  }

  public newUserData:any = {
    new_name:"",
    new_email:"",
    new_phno:"",
    new_city:""
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EditProfilePage');
    this.util.getFromStorage("user").then((userProfile:any)=>{
      this.userCurrentData = userProfile;
    })
  }

  changeUserData(userData){
    this.newUserData = userData
  }

}
