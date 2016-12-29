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
        contact.first_name,
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

  getContacts(db: SQLite) {
    let sql = `SELECT * FROM contact`;
    return new Promise((resolve, reject) => {
      db.executeSql(sql, [])
        .then((data: any) => {
          resolve(data.rows);
        })
        .catch(error => {
          reject(error);
        });
    });
  }  

  remove(db: SQLite, contactId: number) {
    let sql = `DELETE FROM contact WHERE id=?`;
    return new Promise((resolve, reject) => {
      db.executeSql(sql, [contactId])
        .then((data: any) => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }  

  getDetail(db: SQLite, contactId: number) {
    let sql = `SELECT * FROM contact WHERE id=?`;
    return new Promise((resolve, reject) => {
      db.executeSql(sql, [contactId])
        .then((data: any) => {
          resolve(data.rows);
        })
        .catch(error => {
          reject(error);
        });
    });
  }  
}
