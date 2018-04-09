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


  signup(){
    let response = this.api.apiPost('auth/create', this.userData)
      .then(data => {
        console.log(data);
        let parsed = JSON.parse(data.toString());
        if(parsed.status == 1){
          this.api.setToken(parsed.token);

          this.navCtrl.push(SuccessPage);
        }
      });



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
