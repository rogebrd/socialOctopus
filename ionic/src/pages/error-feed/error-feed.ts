import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { PostPage } from '../post/post';
import {SettingsPage} from "../settings/settings";
import {SearchPage} from "../search/search";
import { UserProfilePage } from '../user-profile/user-profile';

@Component({
  selector: 'page-error-feed',
  templateUrl: 'error-feed.html'
})
export class ErrorFeedPage {

  appName:any;
  quotes:any;
  picsURL:any;
  uID:any;

  posts: any;
  noPhoto: 'style="display: none;"';
  itemExpandHeight: number = 200;
  expanded: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    this.appName = navParams.get('appName');
    this.quotes = navParams.get('quotes');
    this.picsURL = navParams.get('picsURL');
    this.uID = navParams.get('uID');

    console.log(this.appName);
    console.log(this.quotes);




  }

  // swipeLeftEvent(event) {
  //   this.navCtrl.push(PostPage);
  // }

  swipeRightEvent(event){
    this.navCtrl.pop();
  }

  goToSettingsPage() {
    this.navCtrl.push(SettingsPage);
  }

  goToSearchPage() {
    this.navCtrl.push(SearchPage);
  }
  goToProfilePage() {

    this.navCtrl.push(UserProfilePage,{appName:this.appName,quotes:this.quotes,picsURL:this.picsURL,uID:this.uID } );

  }

  // goToPostPage() {
  //   this.navCtrl.push(PostPage);
  // }

  getItems(event){
    console.log("Something entered in search bar")
  }

  expandAll(){

    this.expanded = !this.expanded;

    for(let i = 0; i<= this.posts.length - 1; i++){
      this.posts[i].expand = this.expanded;
    }
  }

  expandItem(post){
    console.log("Yep");
    console.log(post.expand);
    console.log(post.content);
    post.expand = !post.expand;
    console.log(post.expand);

  }

  likePost(post) {
    console.log("I like this post");
    console.log(post);

  }

  commentPost(post) {
    console.log("I comment on this post.");
    console.log(post);

  }


}
