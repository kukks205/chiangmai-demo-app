import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Customer } from '../../providers/customer';

import { Push } from 'ionic-native';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
  providers: [Customer]
})
export class SettingPage {
  accept: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  changeToggle() {
    if (this.accept) {
      // register device
      var push = Push.init({
        android: {
          senderID: '1051949984758'
        },
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        },
        windows: {}
      });

      push.on('registration', (response) => {
        console.log(response);
        let token = localStorage.getItem('token');
        let deviceToken = response.registrationId;

        this.customerProvider.registerToken(token, deviceToken)
          .then((data: any) => {
            // success
            console.log('success');
          }, (error) => {
            console.log(error);
          });
      });

      // push.on('notification', function (data) {
      //   console.log(data);
      // });

    }
  }

}
