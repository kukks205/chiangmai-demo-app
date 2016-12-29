import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddContactPage } from '../add-contact/add-contact';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  add() {
    this.navCtrl.push(AddContactPage);
  }

}
