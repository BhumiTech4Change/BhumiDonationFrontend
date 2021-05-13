import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { ApiProvider } from '../../providers/api/api';
import { SERVER_URL } from '../../providers/environment/environment';
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
  public amount:any = 0;
  public url:any = "";
  public isNew:boolean = false;
  public shortURL:any = ""; 
  public link:any = "";
  public donors:any = [];

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
    // console.log('ionViewDidLoad CampaignPage');
    this.util.getFromStorage("user").then((data:any)=>{
      // console.log(data.user.name);
      this.name = data.user.name;
    });
    this.getSpecificFundraiserURL();
  }

  async getSpecificFundraiserURL(){

    this.shortURL = await this.navParams.get("shortID");
    this.link = `${SERVER_URL}/fundraiser/${this.shortURL}`;
    this.api.get(`/api/fundraisers/${this.shortURL}`).subscribe((data:any)=>{
      // console.log("fundraiser links is: ",data);
      if(data.fundraiser!=undefined){
        // this.url.length=0;
        this.url=data;
        console.log("data is: ",this.url)
        this.amount = this.url.fundraiser.amountRaised;
        if(this.url.fundraiser.donors[0]!=undefined){
          this.url.fundraiser.donors.forEach(donor => {
            let dateArr = donor.donatedAt.split(" ").reverse();
            let newDate = dateArr.filter((date,index)=>{
              if(index>1){
                return date
              }
            }).reverse().join(" ")
            donor.donatedAtTime = newDate;
            this.donors.push(donor)
          });
        }
        // data.fundraisers.forEach((singleURL:any)=>{
        //   singleURL.link=`${SERVER_URL}/fundraiser/${singleURL.shortUrl}`;
        //   this.url.push(singleURL);
        // })
        // console.log("Array is: ",this.url);
        // this.isNew = false;
        // this.totalFund();
      }else{
        // this.isNew = true;
      }
    })
  }
}
