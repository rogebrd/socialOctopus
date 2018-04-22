import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { ViewProfilePage } from '../view-profile/view-profile';
import { TestingPage } from '../testing/testing';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the SearchresultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchresults',
  templateUrl: 'searchresults.html',
})
export class SearchresultsPage {
  people: any;
  results: any;
  resoolt: any;
  names = [];
  u_names = [];
  message = [];
  quote = [];
  params = {test : false, code: ""};
  valid = false;
  token: any;
  
 
  picURLS = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, private api: ApiProvider) {
    this.token = navParams.get('token');
    this.api.setToken(this.token);
    this.results = navParams.get('results');
    // var test = (JSON.parse(this.results));
    //console.log(test[0].results);
    let status = 0;
    status = navParams.get('status');
    if (status == 1){
      let str = ""
      let i = 0;
      let size = 0;
      while (i<this.results.length){
        str+=this.results[i];
        i++;
      }

      i = 0;


      var comeon = JSON.parse(str);
      this.resoolt = comeon;
      //console.log(comeon.results[i].name);
      while (i<comeon.results.length){
        let first = JSON.stringify(comeon.results[i].name);
        let second = "";
        let third = JSON.stringify(comeon.results[i].userId);
        let fourth = "";
        let fifth = JSON.stringify(comeon.results[i].Quotes);
        let sixth = "";
        let sev = JSON.stringify(comeon.results[i].profilePicsLink);
        let eight = "";
        let j = 1;
        while (first[j]!= "\""){
          second+= first[j];
          j++;
        }
        j = 1;
        while (third[j]!= "\""){
          fourth+= third[j];
          j++;
        }
        j = 1;
        while (fifth[j]!= "\""){
          sixth+= fifth[j];
          j++;
        }
        j = 1;
        while (sev[j]!= "\""){
          eight+= sev[j];
          j++;
        }
        this.names[i] = second;
        this.u_names[i] = fourth;
        this.quote[i] = sixth;
        this.isValid(eight);
        if (this.valid){
          this.picURLS[i] = eight;
        } else {
          this.picURLS[i] = "assets/img/profile.png";
        }
        
        i++;
      }

      if (navParams.get('test')== true){
        this.params = {test: true, code: "6"};
        this.goToViewProfilePage(0);
      }

      //console.log(comeon);
      //this.results = comeon;
      //this.names[0] = comeon.name;
      //this.u_names[0] = comeon.userId;
    } else {
      this.message[0] = "No results found :(";
      if (navParams.get('test')== true){
        this.params = {test: true, code: "-6"};
        this.navCtrl.push(TestingPage, this.params);
      }
    }

  }

  ionViewDidLoad() {
    //console.log("hello");
  }

  goToViewProfilePage(i){
    this.navCtrl.push(ViewProfilePage, {name: this.names[i], uid: this.u_names[i], quote: this.quote[i],test: this.params.test, code: this.params.code, picsURL: this.picURLS[i], token: this.token});
  }
  isValid(str){
    var i = 0;
    let test1 = false;
    let test2 = false;
    while (i < str.length){
      if (str[i] == '/'){
        test1 = true;
      }
      if (str[i] == '.'){
        test2 = true;
      }
      i++;
    }
    if (test1 && test2){
      this.valid = true;
    }
  }
  
}
