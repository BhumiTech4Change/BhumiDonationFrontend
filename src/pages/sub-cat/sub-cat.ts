import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public navParams: NavParams,
    public subCat: SubCatProvider,
    public api: ApiProvider,
    private util: UtilProvider
  ) { }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SubCatPage');
    this.displaySubCategories();
  }

  public subCatArr:any = [];
  public copyNgoArr:any = [];

  displaySubCategories(){
    //get subCategories of ngo and push into subCatArr
    this.subCatArr = this.subCat.subCatArr;
  }

  displaySingleSubCat(subCat,sublocation,subcause){
    // console.log('subCat is: ', subCat)
    this.subCat.sendSingleSubCatData(subCat);
    // console.log(sublocation , subcause);
    this.navCtrl.push(SubCatFundPage,{sublocation:sublocation , subcause:subcause})
  }

  displayFundraiserLink(link){
    let shareableLink = `${SERVER_URL}/fundraiser/${link}`;
    // console.log("sharable link:",shareableLink)
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
    // console.log("NgoObj for ngo: ",ngoObj)
    this.api.post("/api/fundraisers",ngoObj).subscribe((res:any)=>{
      // console.log("Response of create fundraiser is: ",res);
      // this.subCat.getFundraiserURL(res.link,"ngo")
      this.displayFundraiserLink(res.shortUrl);
      
    })
  }

}
