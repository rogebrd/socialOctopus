import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import {TwitPostProvider} from "../../providers/twit-post/twit-post";
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})

export class PostPage {

  postText: string = '';
  private postForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public twitPostProvider: TwitPostProvider, public toggleStatus: boolean, private toastCtrl: ToastController,
              private formBuilder: FormBuilder) {

    this.postForm = this.formBuilder.group({
      postText: ['', Validators.required],
    });
  }

  logForm() {
    console.log(this.postForm.value)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

  swipeRightEvent(event){
      this.navCtrl.pop();
  }

  postT(){
    this.twitPostProvider.postTweet(this.postText);
    // this.success();
  }

  success(){
    let toast = this.toastCtrl.create({
      message: 'Success!',
      duration: 1500
    });
    toast.present();
  }

}
