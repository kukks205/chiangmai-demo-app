import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';
import { SQLite } from 'ionic-native';

import { AddContactPage } from '../add-contact/add-contact';
import { Contact } from '../../providers/contact';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [Contact]
})
export class ContactPage {
  db: SQLite;
  contacts: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public contactProvider: Contact,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.db = new SQLite();
    this.platform.ready().then(() => {
      this.db.openDatabase({
        name: 'contact2.db',
        location: 'default'
      })
        .then(() => { 
          this.getContacts();
        })
        .catch((error) => {
          console.log(error);
        });
    });

   }

  getContacts() {
    let loader = this.loadingCtrl.create({
      content: 'Loading..',
      spinner: 'dots'
    });

    loader.present();

    this.contactProvider.getContacts(this.db)
      .then((rows: any) => {
        loader.dismiss();
        if (rows.length) {
          this.contacts = [];
          for (let i = 0; i <= rows.length; i++) {
            let contact = {
              id: rows.item(i).id,
              first_name: rows.item(i).first_name,
              last_name: rows.item(i).last_name,
              email: rows.item(i).email,
              telephone: rows.item(i).telephone,
              sex: rows.item(i).sex
            };
            this.contacts.push(contact)
          }
        }
      });
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.db.openDatabase({
        name: 'contact2.db',
        location: 'default'
      })
        .then(() => {
          this.getContacts();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  remove(contact: any) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: `
      คุณต้องการลบ [${contact.first_name} ${contact.last_name}] 
      ใช่หรือไม่?
      `,
      buttons: [
        {
          text: 'ไม่ใช่, ยกเลิก',
          handler: () => {
            // console.log('Disagree clicked');
          }
        },
        {
          text: 'ใช่, ต้องการลบ',
          handler: () => {
            this.contactProvider.remove(this.db, contact.id)
              .then(() => {
                this.getContacts();
              }, (error) => {
                console.log(error);
                let alert = this.alertCtrl.create({
                  title: 'Error!',
                  subTitle: 'เกิดข้อผิดพลาดในการรันคำสั่ง DELETE',
                  buttons: ['OK']
                });
                alert.present();
              });
          }
        }
      ]
    });
    confirm.present();
  }

  add() {
    this.navCtrl.push(AddContactPage);
  }

  edit(contact: any) {
    this.navCtrl.push(AddContactPage, { contactId: contact.id });
  }

  search(event) {
    let query = event.target.value;

    if (query) {
      // search
      this.contactProvider.search(this.db, query)
        .then((rows: any) => {
          if (rows.length) {
            this.contacts = [];
            for (let i = 0; i <= rows.length; i++) {
              let contact = {
                id: rows.item(i).id,
                first_name: rows.item(i).first_name,
                last_name: rows.item(i).last_name,
                email: rows.item(i).email,
                telephone: rows.item(i).telephone,
                sex: rows.item(i).sex
              };
              this.contacts.push(contact)
            }
          }
         }, (error) => {
          
        });
    } else {
      this.getContacts();
    }
  }

}
