import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthPage } from '../pages/auth/auth';
import { ApiProvider } from '../providers/api/api';
import { UtilProvider } from '../providers/util/util';
import { ProfilePage } from '../pages/profile/profile';
import { MyFundraisersPage } from '../pages/my-fundraisers/my-fundraisers';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public api: ApiProvider,
    public util: UtilProvider,
    public auth: AuthProvider
  ) {
    this.initializeApp();
    this.pages = [
      { title:"Profile", component: ProfilePage },
      { title:"Past Donations", component: MyFundraisersPage },
      { title:"Log out", component: AuthPage }
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.show();
      this.splashScreen.hide();
    });
  }

  onNavMenuItemClicked(page) {
    if (page.title === "Log out") {
      return this.auth.logout();
    }
    this.nav.push(page.component);
  }
}
