import { Injectable } from '@angular/core';
import { TwitterService } from 'ng2-twitter';
import 'rxjs/add/operator/map';


@Injectable()
export class TwitPostProvider {

  token = '975527656748933120-ydjuBerkte0RUijuPstnEqopeVVlVWR';
  tokenSecret = 'AaOvIrU1HnY52FDzeRorcn0J0yprh8fdEijF3RaQqDRUm';
  consumerKey = 'vRoF2UprgZJTPQRzOrANtVsiF';
  consumerSecret = 'FpTcb4QiqPTA70vZ00S1ysV7JqV8QJBzQ1EjTtzEom5mwk4LWu';

  constructor(private twitter: TwitterService) {
    console.log('Hello TwitPostProvider Provider');
  }

  //setTokens(token, tokenSecret) {
  //  this.token = token;
  //  this.tokenSecret = tokenSecret;
  //}

  postTweet(text) {
    return this.twitter.post(
      'https://api.twitter.com/1.1/statuses/update.json',
      {
        status: text
      },
      {
        consumerKey: this.consumerKey,
        consumerSecret: this.consumerSecret
      },
      {
        token: this.token,
        tokenSecret: this.tokenSecret
      }
    )
      .map(res => res.json());
  }
}
