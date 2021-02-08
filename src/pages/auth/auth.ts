import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../providers/environment/environment'
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup'
import { UtilProvider } from '../../providers/util/util';

export interface User{
  email:string,
  password:string
}

export interface SignupUser{
  name:string,
  email:string,
  city:string,
  phno:string,
  password:string
}

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})

export class AuthPage {

  constructor(
    public navCtrl: NavController, 
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public api:ApiProvider,
    private http:HttpClient,
    private util:UtilProvider,
  ) { this.menuCtrl.enable(false, 'myMenu'); }

  public user:User = {
    email:"",
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

  inputValidation(userData,dataType,ev){
    const nameRegex = /^[ a-zA-Z]+$/;
    const phoneRegex = /^\d+$/;
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
        this.isPassword = passwordRegex.test(userData);
        break;
      default: console.log("Invalid number");
        break;
    }  
  }

  login(user){
    // console.log("User is logging in: ",user);
    this.http.post(`${SERVER_URL}/api/auth`,{
      email:user.email,
      password:user.password
    }).subscribe(async (res:any)=>{
      // console.log("Response of login: ",res)
      if(res.token){
        // console.log('Token recieved')
        // this.util.presentLoading();
        await this.util.setToStorage("token",res.token);
        await this.api.getToken();
        // console.log("getToken: ",await this.api.getToken())
        this.api.get("/api/auth").subscribe((userData:any)=>{
          this.util.setToStorage("user",userData);
          // console.log('UserData', userData)
        },(err)=>{
          console.log("Error is: ",err.error.msg)
        })
        this.navCtrl.setRoot(HomePage);
      }else{
        console.error('Token not provided');
      }
    },(err)=>{
      // console.error("Error in login:",err)
      if(err.status==400){
        if(err.error.errors[0].param=="email"){
          this.util.presentAlert("Invalid Email","You have entered an incorrect email!");
        }else{
          this.util.presentAlert("Invalid Password","You have entered an incorrect password!");
        }
        this.util.presentAlert("Invalid Credentials","You have entered an incorrect email/password!");
      }
      if(err.status==401){
        if(err.error.msg=="incorrect password"){
          this.util.presentAlert("Invalid Credentials","You have entered an incorrect email/password!");
        }else{
          this.util.presentAlert("Email not registered","There is no account associated with this email")
        }
      }
      if(err.status==402){
        this.util.presentAlert("Email Not verified","Please verify your email before logging in.")
      }
    })
  }

  forgotPassword(){
    // console.log("Follow steps to get password")
  }

  goToSignup(){
    this.navCtrl.push(SignupPage)
  }
}
