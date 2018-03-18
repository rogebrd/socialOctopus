import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SuccessPage } from '../success/success';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  responseData : any;
  userData = {"name": "", "userId": "", "password": ""}

  constructor(public navCtrl: NavController) {
  }
  goToSuccess(params){
    if (!params) params = {};
    
    console.log(this.userData);
    //this.responseData = result;
    this.navCtrl.push(SuccessPage);
  }
}
