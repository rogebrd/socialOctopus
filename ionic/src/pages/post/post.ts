import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})

export class PostPage {

  input = {"title": "", "status": ""};
  private postForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private api: ApiProvider, public toggleStatus: boolean, private toastCtrl: ToastController,
              private formBuilder: FormBuilder) {

    this.api.setToken(navParams.get('token'));

    this.postForm = this.formBuilder.group({
      text: ['', Validators.required],
    });
  }

  swipeRightEvent(event){
      this.navCtrl.pop();
  }

  postToTwitter(){
    this.input.status = this.postForm.value['text'];
    console.log('Twitter input is ' + this.input.status);

    let response = this.api.apiPost('/social/twitter/post', this.input).then(data => {
      console.log(data);
      this.success();
      console.log('Posted status as' + this.input.status);
      }, error => {
      this.showError(error);
    });
  }

  postToTumblr(){
    this.input.status = this.postForm.value['text'];
   
    console.log('Tumblr input is ' + String(this.input.status));

    let response = this.api.apiPost('/social/tumblr/post', this.input).then(data => {
      console.log(data);
      this.success();
      console.log('Posted status as' + this.input.status);
      }, error => {
      this.showError(error);
    });
  }

  success(){
    let toast = this.toastCtrl.create({
      message: 'Success!',
      duration: 1500
    });
    toast.present();
  }

  showError(text) {
      let alert = this.alertCtrl.create({
        title: 'Fail',
        message: text + '\nPosting unsuccessful.',
        buttons: ['OK']
      });
      alert.present(prompt);
  }
  superPost(){
    if (this.input.title == "") this.input.title = "I'm not creative enough to come up with a title";
    this.postToTwitter();
    this.postToTumblr();
    
  }
     

}
