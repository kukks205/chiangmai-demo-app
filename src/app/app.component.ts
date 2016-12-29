import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;

  constructor(platform: Platform, public events: Events) {
    platform.ready().then(() => {
      StatusBar.backgroundColorByHexString('#7f8c8d');
      Splashscreen.hide();

      let db = new SQLite();
      db.openDatabase({
        name: 'contact2.db',
        location: 'default'
      })
        .then(() => {
          let sqlCreateTable = `
          CREATE TABLE IF NOT EXISTS contact(id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT, last_name TEXT, sex TEXT, telephone TEXT, email TEXT)
        `;
          let sqlCreateTable2 = `
          CREATE TABLE IF NOT EXISTS contact2(id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT, last_name TEXT, sex TEXT, telephone TEXT, email TEXT)
        `;
          db.sqlBatch([sqlCreateTable, sqlCreateTable2])
            // db.executeSql(sqlCreateTable, [])
            .then(() => {
              console.log('Create table success');
            }, error => {
              console.log(error);
            });
        }, (err) => {
          console.error('Unable to open database: ', err);
        })
        .catch(error => console.error('Error opening database', error));
      
      let token = localStorage.getItem('token');
      if (token) this.rootPage = TabsPage;
      else this.rootPage = LoginPage;

    });
  }
}
