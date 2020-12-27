import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AuthPage } from '../pages/auth/auth';


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
    EditProfilePage
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
    EditProfilePage
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
