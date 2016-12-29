import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class Login {
  secretKey: string = '1234567890';

  constructor(public http: Http, @Inject('API_URL') public url: string) {

  }

  doLogin(encryptedText: string) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = { data: encryptedText };

      this.http.post(this.url + '/users/login', body, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        }); 
    });
  }

  encrypt(text: string) {
    var ciphertext = CryptoJS.AES.encrypt(text, this.secretKey);
    var encryptedText = ciphertext.toString();
    return encryptedText;  
  }

  decrypt(text: string) {
    var decryptedText = CryptoJS.AES.decrypt(text, this.secretKey);
    var data = decryptedText.toString(CryptoJS.enc.Utf8);
    return data;
  }

}
