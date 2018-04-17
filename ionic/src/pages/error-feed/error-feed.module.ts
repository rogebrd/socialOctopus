import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ErrorFeedPage } from './error-feed';

@NgModule({
  declarations: [
    ErrorFeedPage,
  ],
  imports: [
    IonicPageModule.forChild(ErrorFeedPage),
  ],
})
export class ErrorFeedPageModule {}
