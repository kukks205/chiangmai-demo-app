import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Customer} from '../../providers/customer';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
  providers: [Customer]
})
export class MessagePage {
  users: Array<any>;
  userId: number;
  message: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer
  ) { }

  ionViewDidLoad() {
    let token = localStorage.getItem('token');

    this.customerProvider.getUsersList(token)
      .then((data: any) => {
        this.users = data.rows;
      });
  }

  sendMessage() {
    let token = localStorage.getItem('token');
    this.customerProvider.sendMessage(token, this.userId, this.message)
      .then((data: any) => {
        alert('Send success!');
      }, error => {
        console.log(error);
      });
  }

}
