import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';

// provider
import { Contact } from '../../providers/contact';

@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
  providers: [Contact]
})
export class AddContactPage {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  sex: string;
  sexes: Array<{ id: number, name: string }> = [];
  db: SQLite;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public contactProvider: Contact,
    public platform: Platform
  ) {
    this.db = new SQLite();
    this.platform.ready().then(() => {
      this.db.openDatabase({
        name: 'contact2.db',
        location: 'default'
      })
        .then(() => { })
        .catch((error) => {
          console.log(error);
        });

    });

    this.sexes.push({ id: 1, name: 'ชาย' });
    this.sexes.push({ id: 2, name: 'หญิง' });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactPage');
  }

  save() {
    let contact: any = {
      first_name: this.firstName,
      last_name: this.lastName,
      sex: this.sex,
      email: this.email,
      telephone: this.telephone
    }

    this.contactProvider.save(this.db, contact)
      .then(() => {
        alert('Success')
      }, (error) => {
        console.log(error);
      });
  }

}
