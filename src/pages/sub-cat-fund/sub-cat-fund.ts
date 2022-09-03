import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { SubCatProvider } from '../../providers/sub-cat/sub-cat';
import { ApiProvider } from '../../providers/api/api';
import { UtilProvider } from '../../providers/util/util';
import { SERVER_URL } from '../../providers/environment/environment';

@IonicPage()
@Component({
  selector: 'page-sub-cat-fund',
  templateUrl: 'sub-cat-fund.html',
})
export class SubCatFundPage {

  Sublocation:any;
  Subcause:any;

  constructor(
    public navParams: NavParams,
    public subCat: SubCatProvider,
    private api: ApiProvider,
    private util: UtilProvider
  ) { }

  public ngoSubCat:any = {};


  ionViewDidLoad() {
    this.displaySubCatData()
    this.getLocationCause()
  }

  async getLocationCause(){
    this.Sublocation = await this.navParams.get("sublocation");
    this.Subcause = await this.navParams.get("subcause");
  }

  displaySubCatData(){
    this.ngoSubCat = this.subCat.singleSubCat[0];
  }

  displayFundraiserLink(link){
    let shareableLink = `${SERVER_URL}/fundraiser/${link}`;
    this.util.presentShareAlert("Here is your shareable link",shareableLink);
  }

  createFundraiser(){
    let ngoObj = {
      type:"subCategory",
      subCategory:this.ngoSubCat.name,
      ngo:this.subCat.ngo.name,
      ngoId:this.subCat.ngo._id,
      description:this.subCat.ngo.description,
      subCategoryId:this.ngoSubCat.id
    }

    this.api.post("/api/fundraisers",ngoObj).subscribe((res:any)=>{
      this.displayFundraiserLink(res.shortUrl);
    })
  }
}
