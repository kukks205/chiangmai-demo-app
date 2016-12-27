import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { MapPage } from '../pages/map/map';
//===================================================
import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';
import { MessagePage } from '../pages/message/message';
import { SettingPage } from '../pages/setting/setting';
import { LoginPage } from '../pages/login/login';
import { AddCustomerPage } from '../pages/add-customer/add-customer';
//===================================================
// provider
import { User } from '../providers/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    MapPage,
    TabsPage,
    ContactPage,
    MessagePage,
    SettingPage,
    LoginPage,
    AddCustomerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    MapPage,
    TabsPage,
    ContactPage,
    MessagePage,
    SettingPage,
    LoginPage,
    AddCustomerPage
  ],
  providers: [
    User,
    { provide: 'API_URL', useValue: 'http://10.0.3.241:3000' },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
