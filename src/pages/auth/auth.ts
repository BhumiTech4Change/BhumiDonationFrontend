import { Component } from '@angular/core';
import { IonicPage, NavController ,MenuController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../providers/environment/environment'
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup'
import { UtilProvider } from '../../providers/util/util';
import { AuthProvider } from '../../providers/auth/auth';
import { ResetPage} from '../reset/reset';

export interface User{
  email:string,
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
    public api: ApiProvider,
    private http: HttpClient,
    private util: UtilProvider,
    private authProvider: AuthProvider
  ) { this.menuCtrl.enable(false, 'myMenu'); }

  public user: User = {
    email:"",
    password:""
  }

  public isEmail: boolean = false;
  public isPhone: boolean = false;
  public isName: boolean = false;
  public isCity: boolean = false;
  public isPassword: boolean = false;

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
    this.http.post(`${SERVER_URL}/api/auth`,{
      email:user.email,
      password:user.password
    }).subscribe(async (res:any)=>{
      if(res.token){
        await this.authProvider.setToken( res.token);
        this.api.get("/api/auth").subscribe((userData:any)=>{
          this.authProvider.setUser(userData);
        },(err)=>{
          console.log("Error is: ",err.error.msg)
        })
        await this.navCtrl.setRoot(HomePage);
      }else{
        console.error('Token not provided');
      }
    },(err) => {
      if (err.status == 400){
        this.util.presentAlert("Invalid Credentials","You have entered an incorrect email/password!");
      }
      else if (err.status == 401){
        if(err.error.msg == "incorrect password"){
          this.util.presentAlert("Invalid Credentials","You have entered an incorrect email/password!");
        } else {
          this.util.presentAlert("Email not registered","There is no account associated with this email")
        }
      }
      else if (err.status == 402){
        this.util.presentAlert("Email Not verified","Please verify your email before logging in.")
      }
    })
  }

  goToSignup(){
    this.navCtrl.push(SignupPage)
  }

  goToResetPassword() {
    this.navCtrl.push(ResetPage);
  }
}
