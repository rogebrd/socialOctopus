import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private token = "rogers";

  //config.set('SOToken', "rogers");
  //config.ammend('Content-Type', 'application/json');

  private response: any = {};

  private api_url = "https://xmaxktjmo0.execute-api.us-east-2.amazonaws.com/beta/";

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  setToken(token){
    this.token = token;
  }

  apiGet(endpoint){

    this.http.get(this.api_url + endpoint, {
      headers: new HttpHeaders().set('SOToken', this.token).append("Content-Type", "application/json")
    })
    .subscribe(response => {
      this.response = response;
      console.log(response);
    });

    return (this.response);
    
  }

  apiPost(endpoint, body){
    this.http.post(this.api_url + endpoint, body, {
      headers: new HttpHeaders().set('SOToken', this.token).append("Content-Type", "application/json")
    })
    .subscribe(response => {
      this.response = response;
      console.log(response);
    });

    return (this.response);
  }

}
