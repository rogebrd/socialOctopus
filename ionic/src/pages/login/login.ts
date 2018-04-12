import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SuccessPage } from '../success/success';
import { SignupPage } from '../signup/signup';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  responseData : any;
  userData = {"username": "", "password": ""}

  private creds: any;

  constructor(private api: ApiProvider, public navCtrl: NavController) {
   // temporary
  }

  login(){
    let response = this.api.apiPost('auth/login', this.userData)
    .then(data => {
      console.log(data);
      let parsed = JSON.parse(data.toString());
      if(parsed.status == 1){
        this.api.setToken(parsed.token);

        let input = {"term": ""};
        input.term = this.userData.username;

        this.retrieveUserInfo();
        this.navCtrl.push(HomePage);

      }
    });

  }


  retrieveUserInfo() {



      let response = this.api.apiGet('user/'+this.userData.username).then(data => {
        //console.log(data);

        let parsed = JSON.parse(data.toString());
        let status = 0;
        status = parsed.status

        console.log(data.toString());

      });



  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }
}



