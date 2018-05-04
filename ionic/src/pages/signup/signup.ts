import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { SuccessPage } from '../success/success';
import { ApiProvider } from '../../providers/api/api';
import { TestingPage } from '../testing/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  responseData : any;
  userData = {"name": "", "username": "", "password": ""};
  params = {test : false, code: ""};

  submitAttempt: boolean; 
  signupForm: FormGroup;

  constructor(private api: ApiProvider, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.signupForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
      });

    if (navParams.get('test')== true){
      //console.log("login test is true");
      this.createSignup();
      this.params = {test: true, code: "2"};
      this.signup();

    }
    this.submitAttempt = false;
  }


  signup(){
    this.submitAttempt = true; 

    if(!this.signupForm.valid)
    {
      console.log("invalid details. Please re-enter details");
      //let alert = this.util.doAlert("Error", "Username not available", "Ok");
      //this.navCtrl.present(alert);
      this.submitAttempt = false; 
    } else if(  this.signupForm.value.name === this.signupForm.value.username
             || this.signupForm.value.username === this.signupForm.value.password
             || this.signupForm.value.name === this.signupForm.value.password ){
      console.log("INVALID details: name, username, password should all be unique");
            // can later replace the log with an alert
            //let alert = this.util.doAlert("Error", "Username not available", "Ok");
            //this.navCtrl.present(alert);
            this.submitAttempt = false; 
    } else {
      console.log(this.signupForm.value);
      this.userData.name = this.signupForm.value.name;
      this.userData.username = this.signupForm.value.username;
      this.userData.password = this.signupForm.value.password;
      
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
