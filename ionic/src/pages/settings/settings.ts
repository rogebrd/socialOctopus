import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";

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

  public settings = {
    name: "",
    profilePicUrl: "",
    quotes: "",
    viewPreference: "1",
    type: "",
    socialMediaID: "",
    socialMediaPassword: "",
    visibility: "" 
  };

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  updateSettings(){
    console.log("submitted");
    console.log(this.settings);
    let postBody = {
      name: this.settings.name,
      profilePicUrl: this.settings.profilePicUrl,
      quotes: this.settings.quotes,
      viewPreference: this.settings.viewPreference,
      type: this.settings.type,
      access_token: "",
      access_secret: "",
      visibility: ""
    };

    if(this.settings.visibility){
      postBody.visibility = "1";
    }else{
      postBody.visibility = "0";
    }

    console.log(postBody);
    /*
    let config = {headers: {
      "SOToken": "rogers",
      "Content-Type": "application/json",
    }}

    this.http.post("https://xmaxktjmo0.execute-api.us-east-2.amazonaws.com/beta/user", postBody, config)
    .map(response => response.json())
    .subscribe(response => {
      console.log(response);
    });
    */
  }

}
