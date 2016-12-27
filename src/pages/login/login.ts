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
    this.loginProvider.doLogin(this.username, this.password)
      .then((data: any) => {
        if (data.ok) {
          let token = data.token;
          localStorage.setItem('token', token);
          // redirect to tab page
          this.navCtrl.setRoot(TabsPage);
        } else {
          alert('Login failed!');
        };
    }, (error) => {})
  }  

}
