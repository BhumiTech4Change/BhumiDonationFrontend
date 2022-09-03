import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../providers/environment/environment'
import { UtilProvider } from '../../providers/util/util';
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
    private http:HttpClient,
    private util:UtilProvider)
    { }

  public signupUser:SignupUser = {
    name:"",
    email:"",
    city:"",
    phno:"",
    password:""
  }

  public isEmail:boolean = false;
  public isPhone:boolean = false;
  public isName:boolean = false;
  public isCity:boolean = false;
  public isPassword:boolean = false;
  public isChar:boolean = false;
  public isNum:boolean = false;
  public isSpecialChar:boolean = false;

  validatePassword(data) {
    const charRegex = /(?=.*[a-z])(?=(.*[A-Z]))(?=(.*))/;
    const numberRegex = /(?=(.*[0-9]))/;
    const specialCharRegex = /(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])/;
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
        break;
      default: console.log("Invalid number");
        break;
    }
  }

  signup(user){
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
                this.navCtrl.push(AuthPage);
              },(err)=>{
                if(err.status==400){
                  this.util.presentAlert("Hold up","Wait a minute!!!")
                }
                if(err.status==401){
                  this.util.presentAlert("Already Registered","Please login to continue or register with a different email")
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
}
