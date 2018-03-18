import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';


@Injectable()
export class TwitPostProvider {

  SOToken = 'test';
  url;

  constructor( private http: HTTP) {
    console.log('Hello TwitPostProvider Provider');
    this.url = 'https://ads-api.twitter.com/3/accounts/'+this.SOToken+'/tweet';
  }

  postTweet(text){
    return this.http.post(this.url+'?text='+text, {}, {})
  }
}
