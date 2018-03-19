import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
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

  constructor(public navCtrl: NavController, public http: Http) {

  this.http.get('../assets/timeline_with_photo.json').map(res => res.json()).subscribe(data => {

        this.posts = data;
        console.log("worked");
        for(let i = 0; i<= this.posts.length - 1; i++){
        this.posts[i].platformPic = '/assets/imgs/twitter.png';
        this.posts[i].date = this.calculateSince(this.posts[i].created_at);
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


   calculateSince(datetime){
    let tTime=new Date(datetime);
    let cTime=new Date();
    let sinceMin=Math.round((cTime-tTime)/60000);
    if(sinceMin==0)
    {
        let sinceSec=Math.round((cTime-tTime)/1000);
        if(sinceSec<10)
          let since='less than 10 seconds ago';
        else if(sinceSec<20)
          let since='less than 20 seconds ago';
        else
          let since='half a minute ago';
    }
    else if(sinceMin==1)
    {
        let sinceSec=Math.round((cTime-tTime)/1000);
        if(sinceSec==30)
          let since='half a minute ago';
        else if(sinceSec<60)
          let since='less than a minute ago';
        else
          let since='1 minute ago';
    }
    else if(sinceMin<45)
        let since=sinceMin+' minutes ago';
    else if(sinceMin>44&&sinceMin<60)
        let since='about 1 hour ago';
    else if(sinceMin<1440){
        let sinceHr=Math.round(sinceMin/60);
    if(sinceHr==1)
      let since='about 1 hour ago';
    else
      let since='about '+sinceHr+' hours ago';
    }
    else if(sinceMin>1439&&sinceMin<2880)
        let since='1 day ago';
    else if (sinceMin >= 2880 && sinceMin<10080)
    {
        let sinceDay=Math.round(sinceMin/1440);
        let since=sinceDay+' days ago';
    }
    else if ( sinceMin >= 10080 && sinceMin < 20160){
        let sinceWeek =Math.round(sinceMin/10080);
        let since = sinceWeek + ' week ago';
    }
    else if ( sinceMin >= 20160 && sinceMin < 40320){
        let sinceWeek =Math.round(sinceMin/10080);
        let since = sinceWeek + ' weeks ago';
    }
    else if (sinceMin >= 40320 && sinceMin < 80640) {
        let since = '1 month ago';

    }
    else{
        let sinceMonth =Math.round(sinceMin/40320);
        let since = sinceMonth + ' months ago';

    }

    return since;
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
