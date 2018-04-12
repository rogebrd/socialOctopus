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
  results;

  constructor(private api: ApiProvider, public navCtrl: NavController) {
    // temporary
  }
  goSearch(params){
    if (!params) params = {};

    console.log(this.input);
    if (this.input.term!=  ""){
      let response = this.api.apiPost('search', this.input).then(data => {
        //console.log(data);
        this.results = data;
        let parsed = JSON.parse(data.toString());
        let status = 0;
        status = parsed.status
        console.log(data.toString());
        this.navCtrl.push(SearchresultsPage, {results: data.toString(), status: status});
      });
    }



    //this.responseData = result;
  }
}
