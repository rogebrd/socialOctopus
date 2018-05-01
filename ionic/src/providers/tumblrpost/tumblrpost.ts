import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class TumblrpostProvider {

  token = 'GwRYdHTtRUvzRsYm2iChJwYmQOmwZLRz3onC2ih8ldhettvfAM';
  tokenSecret = 'bXeWmqnn1RxZt6kiAXlxQb3yhFTNsPscemO46Zaaqyrs5vPTca';
  consumerKey = 'xN55zW3A33hqgQncdwZnRaNq2wkSOMWlTrMmiUmQUiPBarCO36';
  consumerSecret = 'dOHZOiToDgrfIxau1JnTcZ8W3YlhUR5PNpn6qh53Wk0NgQc7BV';

  client: Observable<any>;

  constructor(public navCtrl: NavController, public httpClient: HttpClient) {
    this.client = this.httpClient.post('https://api.tumblr.com/v2/blog/socialoctopus/post',
      {
        text:'test'
      },
      {
      },
      )}
}
