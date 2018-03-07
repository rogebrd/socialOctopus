import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostPage } from '../post/post';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }


  getItems(event){
    let alert = this.alertCtrl.create({
      title: 'Testing Searchbar!',
      subTitle: 'This popup means that everything is working!',
      buttons: ['OK']
    });
    alert.present();
  }
  swipeLeftEvent(event) {
      this.navCtrl.push(PostPage);
  }


}
