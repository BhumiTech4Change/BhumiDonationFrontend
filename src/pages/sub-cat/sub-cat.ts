import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SubCatProvider } from '../../providers/sub-cat/sub-cat';
import { SubCatFundPage } from '../sub-cat-fund/sub-cat-fund';
import { ApiProvider } from '../../providers/api/api';
import { UtilProvider } from '../../providers/util/util';
import { SERVER_URL } from '../../providers/environment/environment';

@IonicPage()
@Component({
  selector: 'page-sub-cat',
  templateUrl: 'sub-cat.html',
})
export class SubCatPage {

  Server_url = SERVER_URL;

  constructor(
    public navCtrl: NavController,
    public subCat: SubCatProvider,
    public api: ApiProvider,
    private util: UtilProvider
  ) { }

  ionViewDidLoad() {
    this.displaySubCategories();
  }

  public subCatArr:any = [];

  displaySubCategories(){
    //get subCategories of ngo and push into subCatArr
    this.subCatArr = this.subCat.subCatArr;
  }

  displaySingleSubCat(subCat,sublocation,subcause){
    this.subCat.sendSingleSubCatData(subCat);
    this.navCtrl.push(SubCatFundPage,{sublocation:sublocation , subcause:subcause})
  }

  displayFundraiserLink(link){
    let shareableLink = `${SERVER_URL}/fundraiser/${link}`;
    this.util.presentShareAlert("Here is your shareable link",shareableLink);
  }

  createFundraiser(){
    let ngoObj = {
      type:"ngo",
      subCategory:"",
      ngo:this.subCat.ngo.name,
      ngoId:this.subCat.ngo._id,
      description:this.subCat.ngo.description
    }
    this.api.post("/api/fundraisers",ngoObj).subscribe((res:any)=>{
      this.displayFundraiserLink(res.shortUrl);
    })
  }

}
