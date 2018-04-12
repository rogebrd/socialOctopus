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

  input = {"status": ""};
  // status: string = '';
  private postForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public toggleStatus: boolean, private toastCtrl: ToastController, private formBuilder: FormBuilder,
              private api: ApiProvider) {

    this.postForm = this.formBuilder.group({
      input: ['', Validators.required],
    });
  }

  postToTwitter(params){
    if (!params) params = {};
    console.log(this.input);

    let response = this.api.apiPost('social/twitter/post', this.input).then(data => {
      console.log(data);
      let parsed = JSON.parse(data.toString());
      if(parsed.people != null) {
        //  this.api.setToken(parsed.token);
        console.log(parsed.people);
        this.success();
        console.log('Posted status as' + this.input);
      }
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

  success(){
    let toast = this.toastCtrl.create({
      message: 'Success!',
      duration: 1500
    });
    toast.present();
  }

}
