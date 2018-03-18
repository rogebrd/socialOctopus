import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

let apiUrl = 'https://xmaxktjmo0.execute-api.us-east-2.amazonaws.com/beta/ENDPOINT'
let config = {headers: {
  "SOToken": "",
}}
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }
//.map(response => response.json()).subscribe(response => { });
  postData(postBody) {
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl, JSON.stringify(postBody), config)
      .subscribe(response => {
        resolve();
       }, (err) =>{
        reject(err);
       }
      );
      
      
    });
   }
  
}
