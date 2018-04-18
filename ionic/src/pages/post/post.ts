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
  postText: string = '';
  private postForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private api: ApiProvider, public toggleStatus: boolean, private toastCtrl: ToastController,
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

  postToTwitter(){
    if (this.input.status != ""){
      let response = this.api.apiPost('/social/twitter/post', this.input).then(data => {
        console.log(data);
        this.success();
        console.log('Posted status as' + this.input.status);
      }, error => {
        this.showError(error);
      });
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Empty Post',
        message: 'Post can not be empty.',
        buttons: ['OK']
      });
      alert.present(prompt);
    }
  }

  success(){
    let toast = this.toastCtrl.create({
      message: 'Success!',
      duration: 1500
    });
    toast.present();
  }

  showError(text) {
    this.loading.dismiss().then(() => {
      let alert = this.alertCtrl.create({
        title: 'Fail',
        message: text + '\nPosting unsuccesful.',
        buttons: ['OK']
      });
      alert.present(prompt);
    });
  }

}
