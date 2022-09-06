import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { ApiProvider } from '../../providers/api/api';
import { SERVER_URL } from '../../providers/environment/environment';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-campaign',
  templateUrl: 'campaign.html',
})
export class CampaignPage {

  name:any;
  public amount:any = 0;
  public url:any = "";
  public shortURL:any = "";
  public link:any = "";
  public donors:any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private util: UtilProvider,
    public api: ApiProvider,
    public authProvider: AuthProvider
    ) {}

  ionViewCanEnter(): boolean | Promise<any> {
    return this.authProvider.isAuthenticated(this.navCtrl);
  }

  ionViewDidEnter() {
    this.name = this.authProvider.user.name;
    this.getSpecificFundraiserURL();
  }

  async getSpecificFundraiserURL(){
    this.shortURL = await this.navParams.get("shortID");
    this.link = `${SERVER_URL}/fundraiser/${this.shortURL}`;
    this.api.get(`/api/fundraisers/${this.shortURL}`).subscribe((data:any)=>{
      if(!!data.fundraiser){
        this.url = data;
        this.amount = this.url.fundraiser.amountRaised;
        if(this.url.fundraiser.donors[0]!=undefined){
          this.url.fundraiser.donors.forEach(donor => {
            let dateArr = donor.donatedAt.split(" ").reverse();
            donor.donatedAtTime = dateArr.filter((date, index) => {
              if (index > 1) {
                return date
              }
            }).reverse().join(" ");
            this.donors.push(donor)
          });
        }
      }
    })
  }
}
