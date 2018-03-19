import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private token = "rogers";
  private config: Headers = new Headers({'SOToken': this.token,
  'Content-Type': 'application/json'
  });
  private opt: RequestOptions

  //config.set('SOToken', "rogers");
  //config.ammend('Content-Type', 'application/json');

  private response: any = {};

  private api_url = "https://xmaxktjmo0.execute-api.us-east-2.amazonaws.com/beta/";

  constructor(public http: Http) {
    console.log('Hello ApiProvider Provider');
  }

  setToken(token){
    this.token = token;
  }

  apiGet(endpoint){

    this.http.get(this.api_url + endpoint, new RequestOptions({
      headers: this.config
    }))
    .subscribe(response => {
      this.response = response;
    });

    return (this.response);
  }

  apiPost(endpoint, body){
    this.http.post(this.api_url + endpoint, body, new RequestOptions({
      headers: this.config
    }))
    .subscribe(response => {
      this.response = response;
    });

    return (this.response);
  }

}
