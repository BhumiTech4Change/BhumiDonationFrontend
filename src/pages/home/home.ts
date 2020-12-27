import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { SubCatProvider } from '../../providers/sub-cat/sub-cat';
import { SubCatPage } from '../sub-cat/sub-cat'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public api: ApiProvider,
    public subCat: SubCatProvider
  ) { }

  ionViewDidLoad(){
    this.displayNGO();
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

  callNewPage(name){
    //pass the ngo name and display the subcats for that ngo.
    let ngo = this.ngoArr.filter(o => o.name == name);
    console.log("Ngo object contains: ",ngo)
    this.subCat.sendAllSubCatData(name,ngo[0]);
    this.navCtrl.push(SubCatPage);
  }
}
