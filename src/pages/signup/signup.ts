import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { ApiProvider } from '../../providers/api/api';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../providers/environment/environment'
import { HomePage } from '../home/home';
import { UtilProvider } from '../../providers/util/util';
// import { DOCUMENT } from '@angular/common';
import { AuthPage } from '../auth/auth';

export interface SignupUser{
  name:string,
  email:string,
  city:string,
  phno:string,
  password:string
}

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    // private api:ApiProvider,
    private http:HttpClient,
    private util:UtilProvider)
    // @Inject(DOCUMENT) private doc) 
    { }

  public signupUser:SignupUser = {
    name:"",
    email:"",
    city:"",
    phno:"",
    password:""
  }

  public isShowSignupCard:boolean = false;
  public actionText:string = "Signup";
  public alternateMessage:string = "If you're new here";
  public isEmail:boolean = false;
  public isPhone:boolean = false;
  public isName:boolean = false;
  public isCity:boolean = false;
  public isPassword:boolean = false;
  public isChar:boolean = false;
  public isNum:boolean = false;
  public isSpecialChar:boolean = false;

  validatePassword(data){
    const charRegex = /(?=.*[a-z])(?=(.*[A-Z]))(?=(.*))/;
    const numberRegex = /(?=(.*[0-9]))/;
    const specialCharRegex = /(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])/;
   // const lengthRegex = /{8,}/;
   this.isChar = charRegex.test(data);
   this.isNum = numberRegex.test(data);
   this.isSpecialChar = specialCharRegex.test(data);
   if(this.isChar && this.isNum && this.isSpecialChar){
     this.isPassword = true;
   }
  }

  inputValidation(userData,dataType,ev){
    const nameRegex = /^(?=.*[A-Z])(?=.*[a-z]).{3,15}$/;
    const phoneRegex =/^[0-9]{10}$/;
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    switch(dataType){
      case 2:
        this.isName = nameRegex.test(userData);
        break;
      case 3:
        this.isPhone = phoneRegex.test(userData);
        break;
      case 4:
        this.isEmail = emailRegex.test(userData);
        break;
      case 5:
        this.isCity = nameRegex.test(userData);
        break;
      case 6:
        this.validatePassword(userData);
        // this.isPassword = passwordRegex.test(userData);
        break;
      default: console.log("Invalid number");
        break;
    }  
  }

  signup(user){
    // console.log("A new user is signing in: ",user);
    if(this.isName){
      if(this.isCity){
        if(this.isPhone){
          if(this.isEmail){
            if(this.isPassword){
              this.http.post(`${SERVER_URL}/api/users/`,{
                name:user.name, 
                email:user.email, 
                phno:user.phno, 
                password: user.password, 
                city:user.city
              }).subscribe((res:any)=>{
                // console.log("Response of login: ",res);
                this.navCtrl.push(HomePage);
                // this.changeForm(2)
                //after signup set all regex params to false
              },(err)=>{
                if(err.status==400){
                  this.util.presentAlert("Hold up","Wait a minute!!!")
                }
              });
            }else{
              this.util.presentAlert("Wrong Format","Password must contain a LowerCase, UpperCase, Number and Special Charachter, it must be minimum 8 charachters");
            }
          }else{
            this.util.presentAlert("Wrong Format","Please enter a valid email");
          }
        }else{
          this.util.presentAlert("Wrong Format","Your phone number must be 10 digits and have only numbers");
        }
      }else{
        this.util.presentAlert("Wrong Format","Please enter an existing city");
      }
    }else{
      this.util.presentAlert("Wrong Format","Your name must only contain alphabets");
    }
  }

  goToLogin(){
    this.navCtrl.push(AuthPage);
  }

  // changeForm(type){
  //   let loginBtn = this.doc.querySelector(".loginBtn");
  //   let signupBtn = this.doc.querySelector(".signupBtn");
  //   if(type == 2){
  //     this.isShowSignupCard=false;
  //     loginBtn.classList.add("btnActive");
  //     loginBtn.classList.remove("btnNotActive");
  //     signupBtn.classList.add("btnNotActive");
  //     signupBtn.classList.remove("btnActive");
  //   }else{
  //     this.isShowSignupCard=true;
  //     loginBtn.classList.remove("btnActive");
  //     loginBtn.classList.add("btnNotActive");
  //     signupBtn.classList.remove("btnNotActive");
  //     signupBtn.classList.add("btnActive");
  //   }
  // }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignupPage');
  }

}
