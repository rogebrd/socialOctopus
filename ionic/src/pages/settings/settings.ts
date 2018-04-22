import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";
import { ApiProvider } from '../../providers/api/api';
import { SuccessPage } from '../success/success';
import { HomePage } from '../home/home';
import { TestingPage } from '../testing/testing';

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

  public settings = {"name":"","propic":"","quotes":"","viewPreference":"","type":"","username":"","password":"","visibility":""};

  constructor(private api: ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
    try {
      this.token = navParams.get('token');
      this.api.setToken(this.token);
      console.log(this.api.getToken());
      //this.uID = navParams.get('uID');
    } catch (err) {
     
      this.uID = navParams.get('bradrogers');
    }


    if (navParams.get('test')== true){
      this.params = {test: true, code: navParams.get('code')};
      this.navCtrl.push(TestingPage, this.params);
    }
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
    console.log("submitted");
    console.log(this.settings);
    let postBody = {"userID":"","name":"","profilePicUrl":"","quotes":"","viewPreference":"","type":"","socialMediaID":"","socialMediaPassword":"","visibility":""};
    //console.log("user ID here is : " +this.uID);
    //postBody.userID = this.uID;
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
    }



    console.log(postBody);

    let response = this.api.apiPost('user', postBody)
      .then(data => {
    //    console.log(data);
        //let str = data.toString();
       //if(str==='update successful !! App name and quotes are now changed'){
         //
        //console.log(str);
         //this.navCtrl.push(HomePage,{token:this.api.getToken(),appName:this.settings.name,quotes:this.settings.quotes,picsURL:postBody.profilePicUrl,uID:this.uID,test: this.params.test, code: this.params.code});

       //}

      });



  }

}
