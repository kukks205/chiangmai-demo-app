import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MapPage } from '../map/map';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  users: Array<{ name: string, email: string }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.users.push({ name: 'John Doe', email: 'john@mail.com' });
    this.users.push({ name: 'Steve Job', email: 'steve@gmail.com' });
  }

  goDetail(_user) {
    this.navCtrl.push(MapPage, { user: _user, users: this.users });
  } 
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}
