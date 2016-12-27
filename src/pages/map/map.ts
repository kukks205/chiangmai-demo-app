import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  user: Object;
  users: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
    this.users = this.navParams.get('users');
    // console.log(this.navParams.get('user'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
