import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Customer } from '../../providers/customer';
import * as moment from 'moment';

@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
  providers: [Customer]
})
export class AddCustomerPage {

  sexes: Array<{ id: number, name: string }> = [];  
  groups: Array<{ id: number, name: string }> = [];
  token: string;
  birthDate: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer
  ) {
    this.sexes.push({ id: 1, name: 'ชาย' });
    this.sexes.push({ id: 2, name: 'หญิง' });
    this.token = localStorage.getItem('token');

    this.birthDate = moment().format('YYYY-MM-DD');
  }

  ionViewDidLoad() {
    this.customerProvider.getGroups(this.token)
      .then((data: any) => {
        this.groups = data.rows;
      }, (error) => {
      
      });
  }

}
