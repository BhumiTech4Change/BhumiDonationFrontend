import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { EditProfilePage } from '../edit-profile/edit-profile';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    // public menuCtrl: MenuController,
    public util: UtilProvider
  ) {  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilePage');
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
      // console.log("Data is: ",data)
      // console.log("User is: ",this.user)
    })
  }

  callEditProfilePage(){
    this.navCtrl.push(EditProfilePage)
  }

}
