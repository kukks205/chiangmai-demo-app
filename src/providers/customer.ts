import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Customer {

  constructor(public http: Http, @Inject('API_URL') private url: string) { }
  
  getCustomers(token: string) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      
      this.http.get(`${this.url}/customers`, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }
  
  search(token: string, query: string) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      
      this.http.get(`${this.url}/customers/search/${query}`, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }
  
  getMap(token: string, customerId: number) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      
      this.http.get(`${this.url}/customers/get-map/${customerId}`, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }

  registerToken(token: string, deviceToken: string) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = { deviceToken: deviceToken };

      this.http.post(`${this.url}/fcm/register-device`, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }

  getUsersList(token: string) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      this.http.get(`${this.url}/fcm/users-list`, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }

  sendMessage(token: string, userId: number, message: string) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = { userId: userId, message: message };

      this.http.post(`${this.url}/fcm/send-message`, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }
  
  getGroups(token: string) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });

      this.http.get(`${this.url}/customers/groups`, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }
  
  saveCustomer(token: string, customer: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
        firstName: customer.firstName,
        lastName: customer.lastName,
        sex: customer.sex,
        customerTypeId: customer.customerTypeId,
        telephone: customer.telephone,
        email: customer.email,
        image: customer.image
      };
      this.http.post(`${this.url}/customers`, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }
  
  saveMap(token: string, customerId: any, lat: string, lng: string) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
        customerId: customerId,
        lat: lat,
        lng: lng
      };
      this.http.post(`${this.url}/customers/save-map`, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }
  
  updateCustomer(token: string, customer: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });
      let body = {
        firstName: customer.firstName,
        lastName: customer.lastName,
        sex: customer.sex,
        customerTypeId: customer.customerTypeId,
        telephone: customer.telephone,
        email: customer.email,
        image: customer.image,
        customerId: customer.customerId
      };
      this.http.put(`${this.url}/customers`, body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }

  remove(token: string, customerId: number) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });

      this.http.delete(`${this.url}/customers/${customerId}`, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }

  detail(token: string, customerId: number) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      let options = new RequestOptions({ headers: headers });

      this.http.get(`${this.url}/customers/detail/${customerId}`, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        }, err => {
          reject(err)
        });
    });
  }

}
