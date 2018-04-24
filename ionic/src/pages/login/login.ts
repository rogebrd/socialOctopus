import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { SuccessPage } from '../success/success';
import { SignupPage } from '../signup/signup';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';
import { TestingPage } from '../testing/testing';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  responseData : any;
  userData = {"username": "", "password": ""}
  token:any;
  params = {test : false, code: ""};
  private creds: any;
  appName:any;
  quotes:any;
  picsURL:any;
  uID:any;
  loggedin: boolean = false;

  constructor(private api: ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
   // temporary
    if (navParams.get('test')== true){
      //console.log("login test is true");
      this.userData = {"username": "hey", "password": "hey"};
      this.params = {test: true, code: "1"};
      this.login();

    }
  }

  login(){
    let response = this.api.apiPost('auth/login', this.userData)
    .then(data => {
      console.log(data);
      //let parsed = JSON.parse(data.toString());
      let parsed = {"status": 1, "token": "123"}
      if(parsed.status == 1){
        window['loggedin'] = true;
        this.token = parsed.token;
        this.api.setToken(parsed.token);

        let input = {"term": ""};
        input.term = this.userData.username;

        this.retrieveUserInfo();
        console.log(this.loggedin);
        this.navCtrl.push(HomePage,{token:this.api.getToken(),appName:this.appName,quotes:this.quotes,picsURL:this.picsURL,uID:this.userData.username,test:this.params.test,code:this.params.code });
        return this.loggedin;
      } else if (parsed.status == 0){
        window['loggedin'] = false;
        return this.loggedin;
      } 
      else if (this.params.test == true){
       this.retrieveUserInfo();
        this.params.code = "-1";
        this.navCtrl.push(TestingPage, {token:this.api.getToken(),appName:this.appName,quotes:this.quotes,picsURL:this.picsURL,uID:this.userData.username,test:this.params.test,code:this.params.code });
      }
    });
  }



  retrieveUserInfo() {


    let response = this.api.apiGet('user/'+this.userData.username).then(data => {
        //console.log(data);

        //let parsed = JSON.parse(data.toString());
          let parsed = {"results" : [{"name":"Brad Rogers", "Quotes": "abcd", "profilePicsLink": "picture"}]}

        //let status = 0;
      //  status = parsed.status

        console.log(data.toString());
        this.appName = parsed.results[0].name;
          this.quotes= parsed.results[0].Quotes;
          this.picsURL=parsed.results[0].profilePicsLink;
          this.uID=this.userData.username;

      });

  }

  goToSignup(){
    this.navCtrl.push(SignupPage);
  }

  setUserData(userInfo)
  {
    this.userData.username = "wrong";
    this.userData.password = "info";
  }
}



