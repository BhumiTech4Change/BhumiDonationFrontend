import { Injectable,ViewChild } from '@angular/core';
import { AlertController, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage'

@Injectable()
export class UtilProvider {
  @ViewChild(Nav) nav: Nav;

  constructor(
    private alertCtrl: AlertController,
    private storage: Storage,
    // public navCtrl: NavController
  ) {
    console.log('Hello UtilProvider Provider');
  }

  presentAlert(title,message) {
      let alert = this.alertCtrl.create({
        title,
        message,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              console.log('Okay clicked');
            }
          }
        ]
      });
      alert.present();
  }

  presentShareAlert(title,message) {
    let alert = this.alertCtrl.create({
      title,
      message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Okay clicked');
          }
        },{
          text:"Share",
          handler: () => {
            console.log("Share clicked");
          }
        }
      ]
    });
    alert.present();
  }

  presentLoading(){
    
  }

  getFromStorage(key){
    return new Promise((resolve,reject)=>{
      this.storage.get(key).then((value)=>{
        resolve(value);
      })
    })
  }

  setToStorage(key,value){
    return this.storage.set(key,value);
  }

  getAllKeysOfStorage(){
    return this.storage.keys();
  }
}
