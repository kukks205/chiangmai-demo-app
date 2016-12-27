import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { IData, Person } from '../../model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  age: number;  
  sex: string = 'ชาย';
  groups: Array<IData> = [];
  fullname: string = 'John Doe';
  
  constructor(public navCtrl: NavController) {
    this.age = 20;

    this.groups.push({ id: 1, name: 'สถิตย์ เรียนพิศ' });
    this.groups.push({ id: 2, name: 'Steve Job' });

    let person = new Person();
    person.setFullname('Satit', 'Rianpit');
    // person.getFullname();
  }

  showName(group: IData) {
    console.log(group.id, group.name);
  }

}
