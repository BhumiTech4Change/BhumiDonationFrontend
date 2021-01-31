import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AuthPage } from '../pages/auth/auth';
import { NotificationPage } from '../pages/notification/notification'


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { UtilProvider } from '../providers/util/util';
import { AuthProvider } from '../providers/auth/auth';
import { SubCatPage } from '../pages/sub-cat/sub-cat';
import { SubCatProvider } from '../providers/sub-cat/sub-cat';
import { SubCatFundPage } from '../pages/sub-cat-fund/sub-cat-fund';
import { ProfilePage } from '../pages/profile/profile';
import { MyFundraisersPage } from '../pages/my-fundraisers/my-fundraisers';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { SignupPage } from '../pages/signup/signup';
import { CampaignPage } from '../pages/campaign/campaign';
import { SearchPipe } from '../pipes/search/search';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AuthPage,
    SubCatPage,
    SubCatFundPage,
    ProfilePage,
    MyFundraisersPage,
    EditProfilePage,
    NotificationPage,
    SignupPage,
    CampaignPage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AuthPage,
    SubCatPage,
    SubCatFundPage,
    ProfilePage,
    MyFundraisersPage,
    EditProfilePage,
    NotificationPage,
    SignupPage,
    CampaignPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    UtilProvider,
    AuthProvider,
    SubCatProvider
  ]
})
export class AppModule {}
