import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SubCatProvider {

  constructor(public http: HttpClient) {}

  public subCatArr:any = [];
  public ngoDesc:any = "";
  public singleSubCat:any = "";
  public ngo:any = "";

  sendAllSubCatData(ngo) {
    // ngo contains the ngo object clicked
    this.ngo = ngo;
    this.subCatArr = ngo.subCategories
    this.ngoDesc = ngo.description
  }

  sendSingleSubCatData(subCat){
    this.singleSubCat = this.subCatArr.filter(o => o.name === subCat.name);
  }
}
