import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { SubCatProvider } from '../../providers/sub-cat/sub-cat';
import { SubCatPage } from '../sub-cat/sub-cat';
import { NotificationPage } from '../notification/notification';
import { UtilProvider } from '../../providers/util/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  show_search:any;
  searchText:any;

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public subCat: SubCatProvider,
    private util:UtilProvider,
    public api:ApiProvider
  ) { }

  public name:string = "";

  ionViewDidLoad(){
    this.show_search=false;
    this.displayNGO();
    this.util.getFromStorage("user").then((data:any)=>{
      console.log(data.user.name);
      this.name = data.user.name;
    });
  }
  public ngoArr:any = [];

  callOpenProfile(){
    this.auth.openProfile('login');
  }

  displayNGO(){
    //api call to get list of ngo with subcategories from db.
    this.api.get("/api/ngos").subscribe((data:any)=>{
      console.log("Result of get ngo is: ",data)
      data.ngos.forEach(ngo => {
        this.ngoArr.push(ngo)
      });
    })
    console.log("Array contains: ",this.ngoArr)
  }

  notifications(){
    this.navCtrl.push(NotificationPage);
  }
  callNewPage(name){
    //pass the ngo name and display the subcats for that ngo.
    let ngo = this.ngoArr.filter(o => o.name == name);
    console.log("Ngo object contains: ",ngo)
    this.subCat.sendAllSubCatData(name,ngo[0]);
    this.navCtrl.push(SubCatPage);
  }
  showSearch(){
    let element = document.querySelector('#search');
    if(this.show_search==false){
      this.show_search=true;
      element.classList.remove('disable');
    }
    else{
      this.show_search=false;
      element.classList.add('disable');
    }
  }
  // Search(value:string) {
  // }
}
