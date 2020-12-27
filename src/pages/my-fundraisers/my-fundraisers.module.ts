import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyFundraisersPage } from './my-fundraisers';

@NgModule({
  declarations: [
    MyFundraisersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyFundraisersPage),
  ],
})
export class MyFundraisersPageModule {}
