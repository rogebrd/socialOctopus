import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SuccessPage } from '../success/success';
import { SignupPage } from '../signup/signup';
import { SearchPage } from '../search/search';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  responseData : any;
  userData = {"username": "", "password": ""}

  constructor(private api: ApiProvider, public navCtrl: NavController) {
  }

  login(){
    
    let response = this.api.apiPost('auth/login', this.userData);

    if(response.status = 1){
      this.api.setToken(response.token);
      console.log(response);
      this.navCtrl.push(SuccessPage);
    }
    
  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }
}
