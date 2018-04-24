import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
//import { Data } from './data';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProviderMock {

  private token = "123";
  private data  = {"token" : this.token, 
                  "status": 1
                 };
  //private results: JSONObject;

  //config.set('SOToken', "rogers");
  //config.ammend('Content-Type', 'application/json');

  private response: any = {};

  private api_url = "https://xmaxktjmo0.execute-api.us-east-2.amazonaws.com/beta/";

  constructor() {
    console.log('Hello ApiProvider Provider');
  }

  setToken(token){
    this.token = token;
  }

  getToken(){
    return (this.token);
  }

  apiGet(endpoint, body){
   return new Promise((resolve) => {
      console.log("get: " + this.data);
      resolve(this.data);
    });
  }

  apiPost(endpoint, body){
    return new Promise((resolve) => {
      console.log("post: " + this.data);
      resolve(this.data);
    });
  }

}