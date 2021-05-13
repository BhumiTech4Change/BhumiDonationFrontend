import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { SubCatProvider } from '../../providers/sub-cat/sub-cat';
import { ApiProvider } from '../../providers/api/api';
import { SERVER_URL } from '../../providers/environment/environment';
import { CampaignPage } from '../campaign/campaign';
// import { UtilProvider } from '../../providers/util/util';

@IonicPage()
@Component({
  selector: 'page-my-fundraisers',
  templateUrl: 'my-fundraisers.html',
})
export class MyFundraisersPage {

  total:any;
  public urlArr:any = [];
  public isNew:boolean = false;

  constructor(
    public subCat: SubCatProvider,
    private api: ApiProvider,
    // public menuCtrl: MenuController,
    public navCtrl: NavController,
    // private util: UtilProvider
  ) { }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MyFundraisersPage');
    this.getAllFundraiserURL();
  }

  async totalFund(){
    this.total=0;
    for (let i = 0; i < this.urlArr.length; i++) {
      // console.log("Amount",this.urlArr[i].amountRaised)
      this.total += this.urlArr[i].amountRaised;
      // console.log("total amount",this.total);
    }
  }

  async getAllImages(x,arrLength){
    if(arrLength!=0){
      this.api.get("/api/ngos").subscribe(async (data:any)=>{
        data.ngos.filter(async (ngo)=>{
          if(x.ngoId==ngo._id){
            x.imageURL = `${SERVER_URL}/uploads/${ngo.logo}`
            this.urlArr.push(x)
          }
        })
        this.isNew = false;
        await this.totalFund();
      })
    }else{
      this.isNew = true;
    }
  }

  async getAllFundraiserURL(){
    // console.log("Token in my fundraiser: ",await this.api.getToken())
    this.api.get("/api/fundraisers").subscribe((data:any)=>{
      if(data.fundraisers!=undefined){
        this.urlArr.length=0;
        data.fundraisers.forEach(async (singleURL:any)=>{
          singleURL.link=`${SERVER_URL}/fundraiser/${singleURL.shortUrl}`;
          await this.getAllImages(singleURL,data.fundraisers.length)
        })
      }
    })
  }

  goToCampaign(shortID){
    // console.log(shortID);
    this.navCtrl.push(CampaignPage,{shortID:shortID});
  }
}
