import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  App,
  ActionSheetController,
  Platform,
  AlertController
} from 'ionic-angular';

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
    public app: App,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public alertCtrl: AlertController
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

  removeConfirm(customer: any) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'ต้องการลบรายการนี้ ใช่หรือไม่? ['+ customer.first_name +']',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
          //
          }
        },
        {
          text: 'ลบข้อมูล',
          handler: () => {
            this.customerProvider.remove(this.token, customer.id)
              .then((data: any) => {
                if (data.ok) {
                  this.ionViewWillEnter();
                }
              }, (error) => {
                console.log(error);
              });
          }
        }
      ]
    });
    confirm.present();
  }
  
 showMenu(customer: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Action menu',
      buttons: [
        {
          text: 'ลบข้อมูล',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash': null,
          handler: () => { 
            this.removeConfirm(customer);
          }
        },
        {
          text: 'แก้ไข',
          icon: !this.platform.is('ios') ? 'create': null,
          handler: () => {
            this.navCtrl.push(AddCustomerPage, { id: customer.id });
          }
        },
        {
          text: 'ดู/กำหนด แผนที่',
          icon: !this.platform.is('ios') ? 'map': null,
          handler: () => { 
            this.navCtrl.push(MapPage, { customer: customer });
          }
        },
        {
          text: 'โทร',
          icon: !this.platform.is('ios') ? 'call': null,
          handler: () => { }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close': null,
          handler: () => { }
        }
      ]
    });
    actionSheet.present();
  }

}
