import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { SuccessPage } from '../success/success';
import { ApiProvider } from '../../providers/api/api';
import { TestingPage } from '../testing/testing';

import { HttpModule } from '@angular/http';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  responseData : any;
  userData = {"name": "", "username": "", "password": ""};
  params = {test : false, code: ""};

  constructor(private api: ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
    if (navParams.get('test')== true){
      //console.log("login test is true");
      this.createSignup();
      this.params = {test: true, code: "2"};
      this.signup();

    }
  }


  signup(){
    let response = this.api.apiPost('auth/create', this.userData)
      .then(data => {
        console.log(data);
        let parsed = JSON.parse(data.toString());
        if(parsed.status == 1){
          this.api.setToken(parsed.token);

          this.navCtrl.push(SuccessPage);

        }else if (this.params.test == true){
          this.params.code = "-1";
          this.navCtrl.push(TestingPage, this.params);
        }
      });



  }

  createSignup(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    }
    //console.log(text);
    this.userData.name=text;
    this.userData.password=text;
    this.userData.username=text;
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
