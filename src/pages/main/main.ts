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

import { CallNumber } from 'ionic-native';

import { MapPage } from '../map/map';
import { LoginPage } from '../login/login';
import { AddCustomerPage } from '../add-customer/add-customer';

// provider
import { Customer } from '../../providers/customer';
import { Login } from '../../providers/login';

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
  providers: [Customer, Login]
})
export class MainPage {

  customers: Array<ICustomer> = [];
  token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer,
    public loginProvider: Login,
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
  
  getCustomers() {
   let loader = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'dots'
    });
    loader.present();
    this.customers = [];
    this.customerProvider.getCustomers(this.token)
      .then((data: any) => {
        loader.dismiss();

        let encryptedText = data.data;
        let decrytedText = this.loginProvider.decrypt(encryptedText);
        let _rows = JSON.parse(decrytedText);
        
        console.log(decrytedText);
        console.log(_rows);

        _rows.forEach(v => {
          let obj = {
            id: v.id,
            first_name: v.first_name,
            last_name: v.last_name,
            sex: v.sex,
            email: v.email,
            telephone: v.telephone,
            image: v.image ? 'data:image/jpeg;base64,' + v.image : null
          };
          this.customers.push(obj);
        });
      }, error => {
        loader.dismiss();
      });
  }
  ionViewWillEnter() {
    this.getCustomers();
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
                  this.getCustomers();
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
          handler: () => {
            // console.log(customer);
            CallNumber.callNumber(customer.telephone, true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
          }
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

 search(event) {
   let query = event.target.value;
   if (query) {
       this.customers = [];
       this.customerProvider.search(this.token, query)
         .then((data: any) => {
           data.rows.forEach(v => {
             let obj = {
               id: v.id,
               first_name: v.first_name,
               last_name: v.last_name,
               sex: v.sex,
               email: v.email,
               telephone: v.telephone,
               image: v.image ? 'data:image/jpeg;base64,' + v.image : null
             };
             this.customers.push(obj);
           });
         });
   } else {
     this.customers = [];
     this.getCustomers();
   }
 
 }

 doRefresh(refresher) {
  this.customers = [];
  this.customerProvider.getCustomers(this.token)
    .then((data: any) => {
      refresher.complete();
      data.rows.forEach(v => {
        let obj = {
          id: v.id,
          first_name: v.first_name,
          last_name: v.last_name,
          sex: v.sex,
          email: v.email,
          telephone: v.telephone,
          image: v.image ? 'data:image/jpeg;base64,' + v.image : null
        };
        this.customers.push(obj);
      });
    }, error => {
      refresher.complete();
    });
 }  
  
}
