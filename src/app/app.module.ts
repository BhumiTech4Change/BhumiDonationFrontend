import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { UtilProvider } from '../providers/util/util';
import { AuthProvider } from '../providers/auth/auth';
import { SubCatProvider } from '../providers/sub-cat/sub-cat';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AuthPageModule } from '../pages/auth/auth.module';
import { SubCatPageModule } from '../pages/sub-cat/sub-cat.module';
import { SubCatFundPageModule } from '../pages/sub-cat-fund/sub-cat-fund.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { MyFundraisersPageModule } from '../pages/my-fundraisers/my-fundraisers.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { CampaignPageModule } from '../pages/campaign/campaign.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    AuthPageModule,
    SubCatPageModule,
    SubCatFundPageModule,
    ProfilePageModule,
    MyFundraisersPageModule,
    SignupPageModule,
    CampaignPageModule,
    BrowserModule,
    PipesModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    ApiProvider,
    UtilProvider,
    AuthProvider,
    SubCatProvider,
    SocialSharing,
  ]
})
export class AppModule {}
