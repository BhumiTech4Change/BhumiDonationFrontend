import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SubCatProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SubCatProvider Provider');
  }

  public subCatArr:any = [];
  public ngoDesc:any = "";
  public singleSubCat:any = "";
  public ngo:any = "";

  sendAllSubCatData(name,ngo){
    // ngo contains the ngo object clicked
    this.ngo=ngo;
    this.subCatArr = ngo.subCategories
    this.ngoDesc = ngo.description
    console.log("Subcategories Arr contains: ",this.subCatArr)
  }

  sendSingleSubCatData(subCat){
    this.singleSubCat = this.subCatArr.filter(o => o.name === subCat.name);
    console.log("single subcat is: ",this.singleSubCat)
  }

  
}
