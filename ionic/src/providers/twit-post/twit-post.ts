import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class TwitPostProvider {

  token = '975527656748933120-ydjuBerkte0RUijuPstnEqopeVVlVWR';
  tokenSecret = 'AaOvIrU1HnY52FDzeRorcn0J0yprh8fdEijF3RaQqDRUm';
  consumerKey = 'vRoF2UprgZJTPQRzOrANtVsiF';
  consumerSecret = 'FpTcb4QiqPTA70vZ00S1ysV7JqV8QJBzQ1EjTtzEom5mwk4LWu';

  constructor() {
    console.log('Hello TwitPostProvider Provider');
  }

  postTweet(text){
    console.log(text)
  }

}
