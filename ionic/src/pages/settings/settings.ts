import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";
import { ApiProvider } from '../../providers/api/api';
import { SuccessPage } from '../success/success';
import { HomePage } from '../home/home';
import { TestingPage } from '../testing/testing';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  token:any;
  uID:any;
  params = {test : false, code: ""};

  submitAttempt: boolean; 
  settingsForm: FormGroup;
  
  twitter_sel: boolean;
  tumblr_sel: boolean ;


  //public settings = {"name":"","propic":"","quotes":"","viewPreference":"","type":"","username":"","password":"","visibility":""};

  constructor(private api: ApiProvider, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    try {
      this.token = navParams.get('token');
      this.api.setToken(this.token);
      this.uID = navParams.get('uID');
    } catch (err) {
     
      this.uID = navParams.get('bradrogers');
    }

    this.twitter_sel = true;
      this.tumblr_sel = true;
      this.settingsForm = formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        username: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        quotes: ['', Validators.compose([Validators.maxLength(60)])],
        propic: [''],
        viewPreference: [''],
        //twitter_sel: [''],
        //tumblr_sel: [''],
        type: [''],
        visibility: ['']
      });

    if (navParams.get('test')== true){
      this.params = {test: true, code: navParams.get('code')};
      this.navCtrl.push(TestingPage, this.params);
    }

    this.submitAttempt = false;
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  swipeRightEvent(event){
    this.navCtrl.pop();
  }
  return() {
    this.navCtrl.push(TestingPage, this.params);

  }

  updateSettings(){
    this.submitAttempt = true;

    if(!this.settingsForm.valid)
    {
      console.log("invalid details. Please re-enter details");
      //let alert = this.util.doAlert("Error", "Username not available", "Ok");
      //this.navCtrl.present(alert);
      this.submitAttempt = false; 
    } else if(  this.settingsForm.value.name === this.settingsForm.value.username
             || this.settingsForm.value.username === this.settingsForm.value.password
             || this.settingsForm.value.name === this.settingsForm.value.password 
             || this.settingsForm.value.quotes === this.settingsForm.value.name 
             || this.settingsForm.value.quotes === this.settingsForm.value.username 
             || this.settingsForm.value.quotes === this.settingsForm.value.password )
    {
             console.log("INVALID details: name, username, password & quotes should all be unique");
             //let alert = this.util.doAlert("Error", "Username not available", "Ok");
             //this.navCtrl.present(alert);
             this.submitAttempt = false; 
    } else {
      console.log("submitted");
      //console.log(this.settings);
      let postBody = {"userID":"",
                      "name":"",
                      "profilePicUrl":"",
                      "quotes":"",
                      "viewPreference":"",
                      //"twitter_sel": "",
                      //"tumblr_sel": "",
                      "type":"",
                      "socialMediaID":"",
                      "socialMediaPassword":"",
                      "visibility":""};

      /*
      postBody.name = this.settings.name;
      postBody.profilePicUrl = this.settings.propic;
      postBody.quotes = this.settings.quotes;
      postBody.viewPreference = "1";
      postBody.type = this.settings.type;
      postBody.socialMediaID = this.settings.username;
      postBody.socialMediaPassword = this.settings.password;
      if(this.settings.visibility){
        postBody.visibility = "1";
      }else{
        postBody.visibility = "0";
      }*/

      postBody.userID = this.uID;
      postBody.name = this.settingsForm.value.name;
      postBody.profilePicUrl = this.settingsForm.value.propic;
      postBody.quotes = this.settingsForm.value.quotes;
      postBody.viewPreference = "1";

      //postBody.twitter_sel = this.twitter_sel ? "true" : "false";
      //postBody.tumblr_sel = this.tumblr_sel ?  "true" : "false";
      postBody.type = this.twitter_sel ? "": "";
      

      //postBody.type.twitter = this.settingsForm.value.type.twitter.toString();
      //postBody.type.tumblr = this.settingsForm.value.type.tumblr.toString();
      postBody.socialMediaID = this.settingsForm.value.username;
      postBody.socialMediaPassword = this.settingsForm.value.password;
      postBody.visibility = this.settingsForm.value.visibility ? "1" : "0";
      

      console.log(postBody);

      let response = this.api.apiPost('user', postBody)
        .then(data => {
          console.log(data);
          let str = data.toString();
         if(str==='update successful !! App name and quotes are now changed')
         {
          console.log(str);
          this.navCtrl.push(HomePage,{token:this.api.getToken(),appName:postBody.name,quotes:postBody.quotes,picsURL:postBody.profilePicUrl,uID:this.uID,test: this.params.test, code: this.params.code});
         } else {
           console.log("ERROR: status is 0");
         }
       });
    }

  }

  selectTwitter(){
    //console.log("before" + this.twitter_sel);
    this.twitter_sel = !this.twitter_sel;
    //console.log("after" + this.twitter_sel);
  }
  selectTumblr(){
    this.tumblr_sel = !this.tumblr_sel;
  }
}
