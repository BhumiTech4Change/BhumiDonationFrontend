import { Component } from '@angular/core';
import { NavController , MenuController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { SubCatProvider } from '../../providers/sub-cat/sub-cat';
import { SubCatPage } from '../sub-cat/sub-cat';
import { UtilProvider } from '../../providers/util/util';
import { SERVER_URL } from '../../providers/environment/environment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Server_url = SERVER_URL;
  show_search: any;
  searchText: any;

  public ngoArr: any = [];

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    public subCat: SubCatProvider,
    private util: UtilProvider,
    public api: ApiProvider,
    public menuCtrl: MenuController
  ) { this.menuCtrl.enable(true, 'myMenu'); }

  public name: string = "";

  ionViewCanEnter(): boolean | Promise<any> {
    return this.auth.isAuthenticated();
  }

  ionViewDidEnter() {
    this.show_search = false;
    this.displayNGO();
    this.util.getFromStorage("user").then((data:any)=>{
      this.name = data.user.name;
    });
  }

  displayNGO(){
    //api call to get list of ngo with subcategories from db.
    this.api.get("/api/ngos").subscribe((data:any) => {
      this.ngoArr = data.ngos;
    })
  }

  callNewPage(ngo){
    //pass the ngo name and display the subcats for that ngo.
    this.subCat.sendAllSubCatData(ngo);
    this.navCtrl.push(SubCatPage);
  }

  showSearch(){
    let element = document.querySelector('#search');
    if(this.show_search == false){
      this.show_search = true;
      element.classList.remove('disable');
    }
    else{
      this.show_search = false;
      element.classList.add('disable');
    }
  }
}
