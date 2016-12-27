import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, App } from 'ionic-angular';

import { MapPage } from '../map/map';
import { LoginPage } from '../login/login';
import { AddCustomerPage } from '../add-customer/add-customer';

// provider
import { Customer } from '../../providers/customer';

interface ICustomer {
  id: number;
  first_name?: string;
  last_name?: string;
  sex?: string;
  image?: string;
}

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers: [Customer]
})
export class MainPage {

  customers: Array<ICustomer> = [];
  token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer,
    public loadingCtrl: LoadingController,
    public app: App
  ) {
    this.token = localStorage.getItem('token');
  }

  goDetail() {
    this.navCtrl.push(MapPage, {  });
  } 
  
  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'dots'
    });
    loader.present();

    this.customers = [];
    this.customerProvider.getCustomers(this.token)
      .then((data: any) => {
        loader.dismiss();
        data.rows.forEach(v => {
          let obj = {
            id: v.id,
            first_name: v.first_name,
            last_name: v.last_name,
            sex: v.sex,
            email: v.email,
            image: v.image ? 'data:image/jpeg;base64,' + v.image : null
          };
          this.customers.push(obj);
        });
      }, error => {
        loader.dismiss();
      });
  }

  logout() {
    localStorage.removeItem('token');
    let nav = this.app.getRootNav(); 
    nav.setRoot(LoginPage);
  }

  add() {
    this.navCtrl.push(AddCustomerPage);
  }

}
