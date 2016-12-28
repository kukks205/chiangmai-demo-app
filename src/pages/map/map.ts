import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation, LaunchNavigator, LaunchNavigatorOptions } from 'ionic-native';

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
  currentLat: any;
  currentLng: any;

  zoomLevel: number = 18;

  customerLat: any;
  customerLng: any;
  customerName: string;

  token: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: Customer,
    public loadingCtrl: LoadingController
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

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Locating...',
      spinner: 'dots'
    });

    loader.present();
    Geolocation.getCurrentPosition().then((resp) => {
      loader.dismiss();
      this.currentLat = resp.coords.latitude;
      this.currentLng = resp.coords.longitude;

      console.log(this.currentLat);
      console.log(this.currentLng);

      // get customer latLng from db;
      this.customerProvider.getMap(this.token, this.customer.id)
        .then((data: any) => {
          if (data.ok) {
            if (data.latLng.lat && data.latLng.lng) {
              this.customerLat = data.latLng.lat;
              this.customerLng = data.latLng.lng;
              this.lat = data.latLng.lat;
              this.lng = data.latLng.lng;
            } else {
              this.lat = this.currentLat;
              this.lng = this.currentLng;
            }
          }
        }, (error) => {
          console.log(error);
        });

    }).catch((error) => {
      console.log('Error getting location', error);
      });
  }

  getCurrentLocation() {
    let loader = this.loadingCtrl.create({
      content: 'Locating...',
      spinner: 'dots'
    });
    loader.present();
    Geolocation.getCurrentPosition().then((resp) => {
      loader.dismiss();
      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude
      console.log(resp);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  launchNavigator() {
    let options: LaunchNavigatorOptions = {
      start: [this.currentLat, this.currentLng]
    };

    LaunchNavigator.navigate([this.customerLat, this.customerLng], options)
      .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
      );

  }

}
