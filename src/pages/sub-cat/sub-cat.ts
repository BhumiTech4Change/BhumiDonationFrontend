import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubCatProvider } from '../../providers/sub-cat/sub-cat';
import { SubCatFundPage } from '../sub-cat-fund/sub-cat-fund';
import { ApiProvider } from '../../providers/api/api';
import { UtilProvider } from '../../providers/util/util';

@IonicPage()
@Component({
  selector: 'page-sub-cat',
  templateUrl: 'sub-cat.html',
})
export class SubCatPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public subCat: SubCatProvider,
    public api: ApiProvider,
    private util: UtilProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubCatPage');
    this.displaySubCategories();
  }

  public subCatArr:any = [];
  public copyNgoArr:any = [];

  displaySubCategories(){
    //get subCategories of ngo and push into subCatArr
    this.subCatArr = this.subCat.subCatArr;
  }

  displaySingleSubCat(subCat){
    console.log('subCat is: ', subCat)
    this.subCat.sendSingleSubCatData(subCat);
    this.navCtrl.push(SubCatFundPage)
  }

  displayFundraiserLink(link){
    this.util.presentAlert("Here is your sharable Link",link)
  }

  createFundraiser(){
    let ngoObj = {
      type:"ngo",
      subCategory:"",
      ngo:this.subCat.ngo.name,
      ngoId:this.subCat.ngo._id,
      description:this.subCat.ngo.description
    }
    console.log("NgoObj for ngo: ",ngoObj)
    this.api.post("/api/fundraisers",ngoObj).subscribe((res:any)=>{
      console.log("Response of create fundraiser is: ",res);
      // this.subCat.getFundraiserURL(res.link,"ngo")
      this.displayFundraiserLink(res.link);
      
    })
  }

}
