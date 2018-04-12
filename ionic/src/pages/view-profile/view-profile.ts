import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ViewProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {
  posts: any;
  noPhoto: 'style="display: none;"';
  itemExpandHeight: number = 200;
  expanded: boolean = false;
  name = "Michael Phelps";
  uname = "";
  quote = "Life is like a box of chocolates";
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.name = navParams.get('name');
    this.uname = navParams.get('uid');
    this.http.get('../assets/timeline_with_photo.json').map(res => res.json()).subscribe(data => {

        this.posts = data;
        console.log("worked");
        for(let i = 0; i<= this.posts.length - 1; i++){
          this.posts[i].platformPic = '/assets/imgs/twitter.png';
          //    this.posts[i].date = this.calculateSince(this.posts[i].created_at);
          this.posts[i].user.screen_name = '@' + this.posts[i].user.screen_name;
          if (typeof this.posts[i].entities.media !== 'undefined'){
            this.posts[i].hasPhoto = true;
            this.posts[i].photo = this.posts[i].entities.media[0].media_url;
          }
          else{
            this.posts[i].hasPhoto = false;
            this.posts[i].photo = null;
          }

        }
      },
      err => {
        console.log("Oops!");
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfilePage');
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
