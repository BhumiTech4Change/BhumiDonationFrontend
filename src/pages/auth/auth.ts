import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../providers/environment/environment'
import { HomePage } from '../home/home';
import { UtilProvider } from '../../providers/util/util';
import { DOCUMENT } from '@angular/common';

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
    public navParams: NavParams,
    private api:ApiProvider,
    private http:HttpClient,
    private util:UtilProvider,
    @Inject(DOCUMENT) private doc
  ) { }

  public user:User = {
    email:"",
    password:""
  }

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

  // ionViewWillEnter() {
  //   console.log("Document object: ",DOCUMENT,this.doc);
  // }

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
    console.log("User is logging in: ",user);
    this.http.post(`${SERVER_URL}/api/auth`,{
      email:user.email,
      password:user.password
    }).subscribe(async (res:any)=>{
      console.log("Response of login: ",res)
      if(res.token){
        console.log('Token recieved')
        await this.util.setToStorage("token",res.token);
        await this.api.getToken();
        console.log("getToken: ",await this.api.getToken())
        this.api.get("/api/auth").subscribe((userData:any)=>{
          this.util.setToStorage("user",userData);
          console.log('UserData', userData)
        },(err)=>{
          console.log("Error is: ",err.error.msg)
        })
        this.navCtrl.setRoot(HomePage);
      }else{
        console.error('Token not provided');
      }
    },(err)=>{
      console.error("Error in login:",err)
      if(err.status==400){
        // if(err.error.errors[0].param=="email"){
        //   this.util.presentAlert("Invalid Email","You have entered an incorrect email!");
        // }else{
        //   this.util.presentAlert("Invalid Password","You have entered an incorrect password!");
        // }
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

  signup(user){
    console.log("A new user is signing in: ",user);
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
                console.log("Response of login: ",res);
                this.changeForm(2)
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

  forgotPassword(){
    console.log("Follow steps to get password")
  }

  changeForm(type){
    let loginBtn = this.doc.querySelector(".loginBtn");
    let signupBtn = this.doc.querySelector(".signupBtn");
    if(type == 2){
      this.isShowSignupCard=false;
      loginBtn.classList.add("btnActive");
      loginBtn.classList.remove("btnNotActive");
      signupBtn.classList.add("btnNotActive");
      signupBtn.classList.remove("btnActive");
    }else{
      this.isShowSignupCard=true;
      loginBtn.classList.remove("btnActive");
      loginBtn.classList.add("btnNotActive");
      signupBtn.classList.remove("btnNotActive");
      signupBtn.classList.add("btnActive");
    }
  }
}
