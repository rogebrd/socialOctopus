import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchresultsPage } from '../searchresults/searchresults';
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  input = "";
  constructor(public navCtrl: NavController) {
  }
  goSearch(params){
    if (!params) params = {};
    console.log(this.input);
    this.navCtrl.push(SearchresultsPage);
    //this.responseData = result;
  }
}
