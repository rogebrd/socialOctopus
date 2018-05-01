import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ApiProvider } from '../../providers/api/api';
import 'rxjs/add/operator/map';
import { NavController,NavParams } from 'ionic-angular';
import { PostPage } from '../post/post';
import {SettingsPage} from "../settings/settings";
import {SearchPage} from "../search/search";
import { UserProfilePage } from '../user-profile/user-profile';
import { ErrorFeedPage } from '../error-feed/error-feed';
import { TestingPage } from '../testing/testing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts: any;
  postsT: any;
  photos: any
  noPhoto: 'style="display: none;"';
  itemExpandHeight: number = 200;
  expanded: boolean = false;
  twitterFeedEndpoint: '';
  apiError: number = 0;
  token : any;

  appName:any;
  quotes:any;
  picsURL:any;
  uID:any;
  params = {test : false, code: ""};

  constructor(public navCtrl: NavController, private navParams: NavParams, private api: ApiProvider, public http: Http) {
    this.token = navParams.get('token');
    this.uID = navParams.get('uID');
    this.api.setToken(this.token);

    this.appName = navParams.get('appName');
    this.quotes = navParams.get('quotes');
    this.picsURL = navParams.get('picsURL');
    this.uID = navParams.get('uID');

    console.log(this.appName);
    console.log(this.quotes);

    if (navParams.get('test')== true){
      this.params = {test: true, code: navParams.get('code')};
      this.return();
    }
    console.log("Called Get Feed");
    this.posts = new Array();
    this.getFeed();
    this.getTumblrFeed();
//    this.posts.sort(this.compare);
          console.log(this.posts);

    console.log("Returned to Constructor");
  }

 
  displayFakePage() {

    this.http.get('../assets/timeline_with_photo.json').map(res => res.json()).subscribe(data => {

      this.posts = data;
      console.log(this.posts);
      for(let i = 0; i<= this.posts.length - 1; i++){
        this.posts[i].platformPic = '/assets/imgs/twitter.png';
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

  displayFakeTum() {

    this.http.get('../assets/tumblr.json').map(res => res.json()).subscribe(data => {
      this.postsT = data.response.posts;
      for(let i = 0; i<= this.postsT.length - 1; i++){
        this.postsT[i].platformPic = '/assets/imgs/tumblr.png';

            //    this.posts[i].date = this.calculateSince(this.posts[i].created_at);
            this.postsT[i].screenName = '@' + this.postsT[i].blog_name;
            this.postsT[i].name = this.postsT[i].blog_name;
            this.postsT[i].profileImg = 'api.tumblr.com/v2/blog/' + this.postsT[i].blog_name + '/avatar';
            this.postsT[i].likes = this.postsT[i].note_count;
            this.postsT[i].comments = this.postsT[i].note_count;
            this.postsT[i].text = this.postsT[i].body;
            this.postsT[i].hasPhoto = false;
            this.postsT[i].photo = null;
            this.postsT[i].date = this.displayDate(this.postsT[i].date);


          }
          for (let i = 0; i<= this.postsT.length - 1; i++){

            this.posts.push(this.postsT[i]);
          }
        },
        err => {
          console.log("Oops!");
        }
        );
  }

displayDate(date){
 date = new Date(Date.parse(date));
 let dateNow = new Date();
 let a;
 let diff = Math.floor((+dateNow - date) / 1000);
     if (diff <= 1) {a = "just now";}
     else if (diff < 20) {a = diff + " seconds ago";}
     else if (diff < 40) {a = "half a minute ago";}
     else if (diff < 60) {a = "less than a minute ago";}
     else if (diff <= 90) {a = "one minute ago";}
     else if (diff <= 3540) {a = Math.round(diff / 60) + " minutes ago";}
     else if (diff <= 5400) {a = "1 hour ago";}
     else if (diff <= 86400) {a = Math.round(diff / 3600) + " hours ago";}
     else if (diff <= 129600) {a = "1 day ago";}
     else if (diff < 907200) {a = Math.round(diff / 86400) + " days ago";}
     else if (diff < 1814400) {a = "1 week ago"; } 
     else if (diff < 3628800) {a = Math.round(diff / 907200) + " weeks ago";}
     else if (diff < 7257600) {a = "1 month ago"; } 
     else if (diff < 41731200) {a = Math.round(diff / 3628800) + " months ago";}
     else if (diff < 87091200) {a = "1 year ago"; } 
     else {a = Math.round(diff / 43545600) + " years ago";}
     return a;
}

sortDate(date){
     date = new Date(Date.parse(date));
     let dateNow = new Date();
     return Math.floor((+dateNow - date) / 1000);
}



getFeed() {
  console.log("Entered Get Feed - Right before api.Get");

  let response = this.api.apiGet('social/twitter/feed')
  .then(data => {


    console.log("Inside Response");

    

    if(data[0] == 'E'){
     this.apiError = 1;
     console.log('API ERROR DETECTED');
     this.goToErrorFeedPage();
   }
   else {
    let tweets = JSON.parse(String(data));
    this.postsT = JSON.parse(String(tweets.tweets));
     this.processFeed();
   } 
 });
  console.log("Outside Response");

}


processFeed(){
  console.log("twitter feed processing rn\n");
  for(let i = 0; i<= this.postsT.length - 1; i++){

    this.postsT[i].platformPic = '/assets/imgs/twitter.png';
    this.postsT[i].screenName = '@' + this.postsT[i].user.screen_name;
    this.postsT[i].name = this.postsT[i].user.name;
    this.postsT[i].profileImg = this.postsT[i].user.profile_image_url;
    this.postsT[i].likes = this.postsT[i].user.favourites_count;
    this.postsT[i].comments = this.postsT[i].retweet_count;
    this.postsT[i].date = this.displayDate(this.postsT[i].created_at);
    this.postsT[i].sortDate = this.sortDate(this.postsT[i].created_at);
    this.postsT[i].Tumblr = false;

    if (typeof this.postsT[i].entities.media !== 'undefined'){
      this.postsT[i].hasPhoto = true;
      this.postsT[i].photo = this.postsT[i].entities.media[0].media_url;
    }
    else{
      this.postsT[i].hasPhoto = false;
      this.postsT[i].photo = null;
    }
    this.posts.push(this.postsT[i]);
    this.posts.sort((a,b) => {
      return a.sortDate - b.sortDate;});
  }
}

getTumblrFeed(){
  console.log("Enter TF");
  let response = this.api.apiGet('social/tumblr/feed')
  .then(data => {


    if(data[0] == 'E'){
      this.apiError = 1;
      console.log('API ERROR DETECTED');
      this.goToErrorFeedPage();
    }
    else {
      this.postsT = JSON.parse(String(data));
      this.postsT = this.postsT.posts;
     this.processTumblrFeed();
    }
  });
}

processTumblrFeed(){
  console.log("tumblr feed processing rn\n");
             
for(let i = 0; i<= this.postsT.length - 1; i++){
       



        this.postsT[i].platformPic = '/assets/imgs/tumblr.png';

            //this.posts[i].date = this.calculateSince(this.posts[i].created_at);
            this.postsT[i].screenName = '@' + this.postsT[i].blog_name;
            this.postsT[i].name = this.postsT[i].blog_name;
            this.postsT[i].profileImg = 'https://api.tumblr.com/v2/blog/' + this.postsT[i].blog_name +'/avatar';
            this.postsT[i].likes = this.postsT[i].note_count;
            this.postsT[i].comments = this.postsT[i].note_count;
            this.postsT[i].text = this.postsT[i].body;
            this.postsT[i].hasPhoto = false;
            this.postsT[i].photo = null;
            this.postsT[i].sortDate = this.sortDate(this.postsT[i].date);

            this.postsT[i].date = this.displayDate(this.postsT[i].date);
            this.postsT[i].Tumblr = true;
            this.postsT[i].tumblrPhotos = false;

        if(this.postsT[i].type == "photo") {
            this.postsT[i].tumblrPhotos = true;
          
        }


       this.posts.push(this.postsT[i]);
       this.posts.sort((a,b) => {
      return a.sortDate - b.sortDate;});

  }

}

swipeLeftEvent(event) {
 this.navCtrl.push(PostPage,{token:this.api.getToken()});
}

swipeRightEvent(event){
  this.navCtrl.pop();
}

goToSettingsPage() {
  console.log("go to setting page : " + this.uID);
  this.navCtrl.push(SettingsPage,{uID:this.uID,token:this.api.getToken()});
}

goToSearchPage() {
  this.navCtrl.push(SearchPage,{token:this.api.getToken()});
}

goToErrorFeedPage() {
  this.navCtrl.push(ErrorFeedPage,{token:this.api.getToken(),appName:this.appName,quotes:this.quotes,picsURL:this.picsURL,uID:this.uID } );
}

goToProfilePage() {
  this.navCtrl.push(UserProfilePage,{token:this.api.getToken(),appName:this.appName,quotes:this.quotes,picsURL:this.picsURL,uID:this.uID } );
}


goToPostPage() {
 this.navCtrl.push(PostPage,{token:this.api.getToken()});
}


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
  post.expand = !post.expand;

}

likePost(post) {
  console.log("I like this post");
  console.log(post);

}

commentPost(post) {
  console.log("I comment on this post.");
  console.log(post);

}
return() {
  this.navCtrl.push(TestingPage, this.params);

}


}