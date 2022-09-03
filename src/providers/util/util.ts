import { Injectable,ViewChild } from '@angular/core';
import { AlertController, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { SocialSharing } from '@ionic-native/social-sharing';

@Injectable()
export class UtilProvider {
  @ViewChild(Nav) nav: Nav;

  constructor(
    private alertCtrl: AlertController,
    private storage: Storage,
    private socialSharing: SocialSharing,
  ) {}

  presentAlert(title,message) {
      let alert = this.alertCtrl.create({
        title,
        message,
        buttons: [
          {
            text: 'Ok',
            handler: () => {}
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
          handler: () => {}
        },
        {
          text:"Share",
          handler: () => {
            this.shareUrl(title,message);
          }
        }
      ]
    });
    alert.present();
  }
  shareUrl(title,message){
    this.socialSharing.share(message, title, null , null)
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
