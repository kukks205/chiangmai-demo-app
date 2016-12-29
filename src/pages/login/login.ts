import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// provider
import { Login } from '../../providers/login';
// tab page
import { TabsPage } from '../tabs/tabs';

interface IHttpResult {
  ok: boolean;
  token?: string;
}
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Login]
})
export class LoginPage {

  username: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: Login
  ) { }

  doLogin() {
    let data = { username: this.username, password: this.password };
    let _data = JSON.stringify(data);
    let encryptedText = this.loginProvider.encrypt(_data);

    this.loginProvider.doLogin(encryptedText)
      .then((data: any) => {
        if (data.ok) {
          let encryptedText = data.data;
          let decryptedText = this.loginProvider.decrypt(encryptedText);
          console.log(encryptedText);
          console.log(decryptedText);
          
          let token = decryptedText;
          localStorage.setItem('token', token);
          // redirect to tab page
          this.navCtrl.setRoot(TabsPage);
        } else {
          alert('Login failed!');
        };
    }, (error) => {})
  }  

}
