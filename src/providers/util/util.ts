import { Injectable,ViewChild } from '@angular/core';
import { AlertController, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { SocialSharing } from '@ionic-native/social-sharing';
// import { LoadingController } from 'ionic-angular';

@Injectable()
export class UtilProvider {
  @ViewChild(Nav) nav: Nav;

  constructor(
    private alertCtrl: AlertController,
    private storage: Storage,
    private socialSharing: SocialSharing,
    // public loadingCtrl: LoadingController,
  ) {
    // console.log('Hello UtilProvider Provider');
  }

  presentAlert(title,message) {
      let alert = this.alertCtrl.create({
        title,
        message,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              // console.log('Okay clicked');
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
            //console.log('Okay clicked');
          }
        },
        {
          text:"Share",
          handler: () => {
            //console.log('Share clicked');
            this.shareUrl(title,message);
          }
        }
      ]
    });
    alert.present();
  }
  shareUrl(title,message){
    // console.log("inside share fn")
    this.socialSharing.share(message, title, null , null)
    // .then(() => {
    //   // Success!
    // }).catch(() => {
    //   // Error!
    // });
  }
  // presentLoading() {
  //   const loader = this.loadingCtrl.create({
  //     content: "Please wait...",
  //     duration: 4000
  //   });
  //   loader.present();
  // }

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
