import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { SubCatProvider } from '../../providers/sub-cat/sub-cat';
import { ApiProvider } from '../../providers/api/api';
import { SERVER_URL } from '../../providers/environment/environment';
// import { UtilProvider } from '../../providers/util/util';

@IonicPage()
@Component({
  selector: 'page-my-fundraisers',
  templateUrl: 'my-fundraisers.html',
})
export class MyFundraisersPage {

  constructor(
    public subCat: SubCatProvider,
    private api: ApiProvider,
    // private util: UtilProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyFundraisersPage');
    this.getAllFundraiserURL();
  }

  public urlArr:any = [];
  public isNew:boolean = false;

  async getAllFundraiserURL(){
    console.log("Token in my fundraiser: ",await this.api.getToken())
    this.api.get("/api/fundraisers").subscribe((data:any)=>{
      console.log("All fundraisers links are: ",data);
      if(data.fundraisers!=undefined){
        this.urlArr.length=0;
        data.fundraisers.forEach((singleURL:any)=>{
          singleURL.link=`${SERVER_URL}/fundraiser/${singleURL.shortUrl}`;
          this.urlArr.push(singleURL);
        })
        console.log("Array is: ",this.urlArr)
        this.isNew = false;
      }else{
        this.isNew = true;
      }
    })
  }



}
