import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SuccessPage } from '../success/success';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  responseData : any;
  userData = {"name": "", "username": "", "password": ""}

  constructor(private api: ApiProvider, public navCtrl: NavController) {
  }

  goToSuccess(){
    /*
    let response = this.api.apiPost('auth/create/', this.userData);
    
    if(response.status == 1){
      console.log(response.Message);
      this.navCtrl.push(SuccessPage);
    }
    */
  }
}
