import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public isToggled: boolean = false) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

  swipeRightEvent(event){
      this.navCtrl.pop();
  }

  submitPost(){
    let alert = this.alertCtrl.create({
      title: 'Testing Post!',
      subTitle: 'This popup means that you successfully tweeted!',
      buttons: ['OK']
    });
    alert.present();
  }

  notify(){
    this.isToggled = true;
  }


}
