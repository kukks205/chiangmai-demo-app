import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, App } from 'ionic-angular';

import { MapPage } from '../map/map';
import { LoginPage } from '../login/login';
// provider
import { User } from '../../providers/user';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  users: Array<{ name: string, email: string }> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: User,
    public loadingCtrl: LoadingController,
    public events: Events,
    public app: App
  ) {

  }

  goDetail(_user) {
    this.navCtrl.push(MapPage, { user: _user, users: this.users });
  } 
  
  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'dots'
    });
    loader.present();

    this.userProvider.getUsers()
      .then((data: any) => {
        loader.dismiss();
        this.users = data;
      }, error => {
        loader.dismiss();
      });
  }

  logout() {
    localStorage.removeItem('token');
    let nav = this.app.getRootNav(); 
    nav.setRoot(LoginPage);
  }

}
