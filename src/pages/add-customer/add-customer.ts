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
  // birthDate: any;
  sex: string;
  email: string;
  telephone: string;
  firstName: string;
  lastName: string;
  customerTypeId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer
  ) {
    this.sexes.push({ id: 1, name: 'ชาย' });
    this.sexes.push({ id: 2, name: 'หญิง' });
    this.token = localStorage.getItem('token');

    // this.birthDate = moment().format('YYYY-MM-DD');
  }

  ionViewDidLoad() {
    this.customerProvider.getGroups(this.token)
      .then((data: any) => {
        this.groups = data.rows;
      }, (error) => {
      
      });
  }

  save() {
    let customer = {
      firstName: this.firstName,
      lastName: this.lastName,
      sex: this.sex,
      email: this.email,
      telephone: this.telephone,
      customerTypeId: this.customerTypeId,
      image: null
    };

    this.customerProvider.saveCustomer(this.token, customer)
      .then((data: any) => {
        if (data.ok) {
          alert('Success');
          }
       }, (error) => {
      
      });

  }

}
