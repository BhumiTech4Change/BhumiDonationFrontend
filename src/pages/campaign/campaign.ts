import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { ApiProvider } from '../../providers/api/api';
// import { MyFundraisersPage } from '../my-fundraisers/my-fundraisers';
// import { HttpClient } from '@angular/common/http';
// import { SERVER_URL } from '../../providers/environment/environment'

@IonicPage()
@Component({
  selector: 'page-campaign',
  templateUrl: 'campaign.html',
})
export class CampaignPage {

  name:any;
  url:any;
  public isNew:boolean = false;
  public shortURL:any = ""; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private util:UtilProvider,
    public api:ApiProvider,
    // public myFundraisers: MyFundraisersPage
    // private http:HttpClient,    
    ) { 
      // this.shortURL = navParams.get("shortID");
      
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampaignPage');
    this.util.getFromStorage("user").then((data:any)=>{
      console.log(data.user.name);
      this.name = data.user.name;
    });
    this.getSpecificFundraiserURL();
  }

  async getSpecificFundraiserURL(){

    this.shortURL = await this.navParams.get("shortID");
    console.log(this.shortURL);
    // console.log("Token in my fundraiser: ",await this.api.getToken())
    // this.shortURL = this.myFundraisers.
    this.api.get(`/api/fundraisers/${this.shortURL}`).subscribe((data:any)=>{
      console.log("fundraiser links is: ",data);
      if(data.fundraiser!=undefined){
        // this.url.length=0;
        this.url=data;
        // data.fundraisers.forEach((singleURL:any)=>{
        //   singleURL.link=`${SERVER_URL}/fundraiser/${singleURL.shortUrl}`;
        //   this.url.push(singleURL);
        // })
        console.log("Array is: ",this.url);
        // this.isNew = false;
        // this.totalFund();
      }else{
        // this.isNew = true;
      }
    })
  }
}
