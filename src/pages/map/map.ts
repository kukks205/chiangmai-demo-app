import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Customer } from '../../providers/customer';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [Customer]
})
export class MapPage {
  customer: any;

  lat: number = 51.678418;
  lng: number = 7.809007;  
  zoomLevel: number = 18;

  customerLat: any;
  customerLng: any;
  customerName: string;

  token: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer
  ) {
    this.customer = this.navParams.get('customer');
    this.customerName = `${this.customer.first_name} ${this.customer.last_name}`;
    this.token = localStorage.getItem('token');
  }

  mapClick(event: any) {
    //console.log(event);
    this.customerLat = event.coords.lat;
    this.customerLng = event.coords.lng;
  }

  save() {
    this.customerProvider.saveMap(
      this.token,
      this.customer.id,
      this.customerLat,
      this.customerLng)
      .then((data: any) => {
        if (data.ok) {
          alert('Success');
        }
       }, (error) => {
      
      });
  }

}
