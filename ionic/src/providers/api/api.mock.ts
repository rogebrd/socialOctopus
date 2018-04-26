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

  private token = 123;
  private data_login_post  = "{\"status\": 1, \"token\": \"123\"}";
  private data_login_get = "{\"results\" : [{\"name\":\"Brad Rogers\", \"Quotes\": \"abcd\", \"profilePicsLink\": \"picture\"}]}";

  private data_search_post = "{\"results\":[{\"name\":\"\",\"Quotes\":\"\",\"profilePicsLink\":\"\",\"userId\":\"bradrogers\"}],\"status\":1}";

  private data_settings_post = "{\"message\":\"Update Complete\",\"status\":1}";

  private data_signup_post = "{\"message\":\"Unknown column 'id' in 'field list'\",\"status\":1}";

  private ENDPOINT_LOGIN_POST    = "auth/login";
  private ENDPOINT_LOGIN_GET     = "user";
  private ENDPOINT_SEARCH_POST   = "search";
  private ENDPOINT_SETTINGS_POST = "user";
  private ENDPOINT_SIGNUP_POST   = "auth/create";


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
      console.log("get: " + this.data_login_get);
      resolve(this.data_login_get);
    });
  }

  apiPost(endpoint, body){
    return new Promise((resolve) => {
      /*console.log("endpoint " + endpoint);
      console.log("body " + body);
      console.log("post: " + this.data_login_post);
      */
      switch(endpoint) { 
       case this.ENDPOINT_LOGIN_POST: { 
          resolve(this.data_login_post);
          break; 
       } 
       case this.ENDPOINT_SEARCH_POST: { 
          resolve(this.data_search_post);
          break; 
       } 
       case this.ENDPOINT_SETTINGS_POST: {
          resolve(this.data_settings_post);
          break;    
       } 
       case this.ENDPOINT_SIGNUP_POST: { 
          resolve(this.data_signup_post);
          break; 
       }  
       default: { 
          console.log("default stmt executed, something is wrong");
          break;              
       } 
     }      
    });
  }

}