import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { MapPage } from '../map/map';
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
    public loadingCtrl: LoadingController
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

}
