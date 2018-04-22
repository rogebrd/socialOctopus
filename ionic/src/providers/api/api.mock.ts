import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProviderMock {

  private token = "";

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

  getToken(){
    return (this.token);
  }

  apiGet(endpoint){
  	return new Promise(function(resolve: Function): void {
      resolve();
    }); 
  }

  apiPost(endpoint, body){
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

}