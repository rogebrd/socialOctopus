import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ApiProvider } from '../../providers/api/api';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	posts: any;
  noPhoto: 'style="display: none;"';
  itemExpandHeight: number = 200;
  expanded: boolean = false;
  twitterFeedEndpoint: '';

  constructor(public navCtrl: NavController, private api: ApiProvider, public http: Http) {
        this.getFeed();
  	}

    getFeed(){
      let response = this.api.apiGet('social/twitter/feed')
      .then(data => {
        console.log(JSON.parse(data));
        this.posts = JSON.parse(data);
        this.processFeed();
      });
   //      this.http.get('../assets/textResponse.json').map(res => res.json()).subscribe(data => {
   //       console.log(data);
   //      this.posts = data;
   //      this.processFeed();

   // },
   //  err => {
   //      console.log("Oops!");
   //  }
   //  );
    }


 
  	expandAll(){
    
       this.expanded = !this.expanded;

      for(let i = 0; i<= this.posts.length - 1; i++){
        this.posts[i].expand = this.expanded;
      }
  	}

    processFeed(){
      for(let i = 0; i<= this.posts.length - 1; i++){
        this.posts[i].platformPic = '/assets/imgs/twitter.png';
    //  this.posts[i].date = this.calculateSince(this.posts[i].created_at);
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
