import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SQLite } from 'ionic-native';

@Injectable()
export class Contact {

  constructor(public http: Http) { }

  save(db: SQLite, contact: any) {
    let sql = `
      INSERT INTO contact(first_name, last_name, sex, email, telephone)
      VALUES(?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
      db.executeSql(sql, [
        contact.firs_name,
        contact.last_name,
        contact.sex,
        contact.email,
        contact.telephone
      ])
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }  
}
