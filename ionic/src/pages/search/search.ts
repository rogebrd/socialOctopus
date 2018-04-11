import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchresultsPage } from '../searchresults/searchresults';
import { ApiProvider } from '../../providers/api/api';
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  input = {"term": ""};
  constructor(private api: ApiProvider, public navCtrl: NavController) {
    // temporary
  }
  goSearch(params){
    if (!params) params = {};

    console.log(this.input);

    let response = this.api.apiPost('search', this.input).then(data => {
      console.log(data);
      let parsed = JSON.parse(data.toString());
      if(parsed.people != null){
      //  this.api.setToken(parsed.token);
        console.log(parsed.people);

    //    this.navCtrl.push(SuccessPage);
      }
    });



    this.navCtrl.push(SearchresultsPage);
    //this.responseData = result;
  }

  swipeRightEvent(event){
    this.navCtrl.pop();
  }

}
