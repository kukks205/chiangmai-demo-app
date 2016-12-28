import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Customer } from '../../providers/customer';
// import * as moment from 'moment';

import { Camera, CameraOptions } from 'ionic-native';

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
  base64Image: string;
  imageData: string;

  customerId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer
  ) {
    this.sexes.push({ id: 1, name: 'ชาย' });
    this.sexes.push({ id: 2, name: 'หญิง' });
    this.token = localStorage.getItem('token');
    this.customerId = this.navParams.get('id');
    // this.birthDate = moment().format('YYYY-MM-DD');
  }

  ionViewWillEnter() {
    if (this.customerId) {
      this.customerProvider.detail(this.token, this.customerId)
        .then((data: any) => {
          if (data.ok) {
            this.firstName = data.customer.first_name;
            this.lastName = data.customer.last_name;
            this.sex = data.customer.sex;
            this.customerTypeId = data.customer.customer_type_id;
            this.imageData = data.customer.image;
            this.base64Image = data.customer.image ?
              'data:image/jpeg;base64,' + data.customer.image : null;
            this.email = data.customer.email;
            this.telephone = data.customer.telephone;
          }
        }, (error) => { });
    }
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
      image: this.imageData,
      customerId: this.customerId
    };

    let promise;

    if (this.customerId) {
      promise = this.customerProvider.updateCustomer(this.token, customer)
    } else {
      promise = this.customerProvider.saveCustomer(this.token, customer)
    }

    promise.then((data: any) => {
      if (data.ok) {
        this.navCtrl.pop();
      }
    }, (error) => {
      
    });

  }

  takePicture() {
    let options: CameraOptions = {
      destinationType: 0,
      sourceType: 1,
      allowEdit: true
    };
    Camera.getPicture(options).then((imageData) => {
      this.imageData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  browsePicture() {
    let options: CameraOptions = {
      destinationType: 0,
      sourceType: 0,
      allowEdit: true
    };
    Camera.getPicture(options).then((imageData) => {
      this.imageData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

}
