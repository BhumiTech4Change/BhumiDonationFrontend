import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubCatProvider } from '../../providers/sub-cat/sub-cat';
import { ApiProvider } from '../../providers/api/api';
import { UtilProvider } from '../../providers/util/util';

@IonicPage()
@Component({
  selector: 'page-sub-cat-fund',
  templateUrl: 'sub-cat-fund.html',
})
export class SubCatFundPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public subCat: SubCatProvider,
    private api: ApiProvider,
    private util: UtilProvider
  ) { }
  
  public ngoSubCat:any = {};


  ionViewDidLoad() {
    console.log('ionViewDidLoad SubCatFundPage');
    this.displaySubCatData()
  }


  displaySubCatData(){
    this.ngoSubCat = this.subCat.singleSubCat[0];
    console.log("in subcatfund page: ",this.ngoSubCat)
  }

  displayFundraiserLink(link){
    let shareableLink = `${SERVER_URL}/fundraiser/${link}`;
    console.log("sharable link:",shareableLink)
    this.util.presentAlert("Here is your shareable link",shareableLink);
  }

  createFundraiser(){
    let ngoObj = {
      type:"subCategory",
      subCategory:this.ngoSubCat.name,
      ngo:this.subCat.ngo.name,
      ngoId:this.subCat.ngo._id,
      description:this.subCat.ngo.description
    }

    console.log("ngoObject for subProject: ",ngoObj)
    this.api.post("/api/fundraisers",ngoObj).subscribe((res:any)=>{
      console.log("Response of create fundraiser is: ",res);
      // this.subCat.getFundraiserURL(res.link,"subCategory");
      this.displayFundraiserLink(res.link);
    })
  }
}
