import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuccessPage } from '../success/success';
import { SignupPage } from '../signup/signup';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings'
import { LoginPage } from '../login/login'
import { ApiProvider } from '../../providers/api/api';
import { UserProfilePage } from '../user-profile/user-profile';


/**
 * Generated class for the TestingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testing',
  templateUrl: 'testing.html',
})
export class TestingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestingPage');
  }

  goToSignupPage(){
    this.navCtrl.push(SignupPage);
  }
  goToHomePage(){
    this.navCtrl.push(HomePage);
  }
  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }
  goToLoginPage() {
    this.navCtrl.push(LoginPage);

  }
  goToSearchPage () {
    this.navCtrl.push(SearchPage);
  }
  goToUserPage () {
    this.navCtrl.push(UserProfilePage );
  }
}
