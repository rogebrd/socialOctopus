import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuccessPage } from '../success/success';
import { SignupPage } from '../signup/signup';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings'
import { LoginPage } from '../login/login'
import { ApiProvider } from '../../providers/api/api';
import { UserProfilePage } from '../user-profile/user-profile';



/**
 * Generated class for the TestingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testing',
  templateUrl: 'testing.html',
})
export class TestingPage {
  params = {test : false, code: ""};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //console.log(navParams.get('code'));
    if (navParams.get('code')== "-1"){
      console.log("Login Test Failed");
    } else if (navParams.get('code')== "1"){
      console.log("Login Test Passed");
    }else if (navParams.get('code')== "2"){
      console.log("Signup Test Passed");
    } else if (navParams.get('code')== "-2"){
      console.log("Signup Test Failed");
    }else if (navParams.get('code')== "3"){
      console.log("HomePage Test Passed");
    }else if (navParams.get('code')== "-3"){
      console.log("HomePage Test Failed");
    }else if (navParams.get('code')== "4"){
      console.log("UserProfilePage Test Passed");
    }else if (navParams.get('code')== "-4"){
      console.log("UserProfilePage Test Failed");
    }else if (navParams.get('code')== "5"){
      console.log("SettingsPage Test Passed");
    }else if (navParams.get('code')== "-5"){
      console.log("SettingsPage Test Failed");
    }else if (navParams.get('code')== "6"){
      console.log("Search Test Passed");
    }else if (navParams.get('code')== "-6"){
      console.log("Search Test Failed");
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TestingPage');
  }

  goToSignupPage(){
    this.navCtrl.push(SignupPage, this.params);
  }
  goToHomePage(){
    this.params.code=("3");
    this.navCtrl.push(HomePage, this.params);
  }
  goToSettingsPage(){
    this.params.code=("5");
    this.navCtrl.push(SettingsPage, this.params);
  }
  goToLoginPage() {
    this.navCtrl.push(LoginPage, this.params);
  }
  goToSearchPage () {
    this.params.code=("6");
    this.navCtrl.push(SearchPage, this.params);
  }
  goToUserPage () {
    this.params.code=("4");
    this.navCtrl.push(UserProfilePage, this.params );
  }
  testAll () {
    
    this.params = {test : true, code: ""};
    this.goToSearchPage();
    setTimeout(() => {
      this.params = {test : true, code: ""};
      this.goToLoginPage();
      setTimeout(() => {
        this.params = {test : true, code: ""};
        this.goToSignupPage();
      }, 6000);
      setTimeout(() => {
        this.params = {test : true, code: ""};
        this.goToHomePage();
      }, 6000);
      setTimeout(() => {
        this.params = {test : true, code: ""};
        this.goToUserPage();
      }, 6000);
      setTimeout(() => {
        this.params = {test : true, code: ""};
        this.goToSettingsPage();
      }, 6000);
    }, 6000);
    
  
   // this.params = {test : true, code: ""};
   // this.goToHomePage();
   
  //  this.params = {test : true, code: ""};
  //  this.goToUserPage();
   
  //  this.params = {test : true, code: ""};
   // this.goToSettingsPage();
    
  //  this.params = {test : true, code: ""};
  //  this.goToSearchPage();
    

   
  }
}
