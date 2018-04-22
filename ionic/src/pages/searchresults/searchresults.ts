import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewProfilePage } from '../view-profile/view-profile';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
      console.log(comeon.results[i].name);
      while (i<comeon.results.length){
        let first = JSON.stringify(comeon.results[i].name);
        let second = "";
        let third = JSON.stringify(comeon.results[i].userId);
        let fourth = "";
        console.log(third);
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

        this.names[i] = second;
        this.u_names[i] = fourth;
        i++;
      }

      //console.log(comeon);
      //this.results = comeon;
      //this.names[0] = comeon.name;
      //this.u_names[0] = comeon.userId;
    } else {
      this.message[0] = "No results found :(";
    }

  }

  ionViewDidLoad() {
    //console.log("hello");
  }

  goToViewProfilePage(i){
    this.navCtrl.push(ViewProfilePage, {name: this.names[i], uid: this.u_names[i]});
  }

}
