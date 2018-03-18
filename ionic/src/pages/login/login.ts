import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SuccessPage } from '../success/success';
import { SignupPage } from '../signup/signup';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  responseData : any;
  userData = {"usernId": "", "password": ""}
  constructor(public navCtrl: NavController) {
  }
  goToSuccess(params){
    if (!params) params = {};
    console.log(this.userData);
    this.navCtrl.push(SuccessPage);
  }goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }goToSearch(params){
    if (!params) params = {};
    this.navCtrl.push(SearchPage);
  }
}
