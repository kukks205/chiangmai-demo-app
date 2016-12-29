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

  contactId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public contactProvider: Contact,
    public platform: Platform
  ) {
    this.contactId = this.navParams.get('contactId');

    this.db = new SQLite();
    this.platform.ready().then(() => {
      this.db.openDatabase({
        name: 'contact2.db',
        location: 'default'
      })
        .then(() => {
          if (this.contactId) {
            this.contactProvider.getDetail(this.db, this.contactId)
              .then((rows: any) => {
                this.firstName = rows.item(0).first_name;
                this.lastName = rows.item(0).last_name;
                this.email = rows.item(0).email;
                this.telephone = rows.item(0).telephone;
                this.sex = rows.item(0).sex;
              }, (error) => {
            
              });
          }
         })
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
        this.navCtrl.pop();
      }, (error) => {
        console.log(error);
      });
  }

}
