import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  appName:any;
  quotes:any;
  picsURL:any;
  uID:any;

  name = this.appName;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('in user profile page now');
    console.log(navParams.get('quotes'));
    this.appName = navParams.get('appName');
    this.quotes = navParams.get('quotes');
    this.picsURL = navParams.get('picsURL');
    this.uID = navParams.get('uID');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }
  goToHomePage(){
    this.navCtrl.push(HomePage);
  }

}
