import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchresultsPage } from './searchresults';

@NgModule({
  declarations: [
    SearchresultsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchresultsPage),
  ],
})
export class SearchresultsPageModule {}
