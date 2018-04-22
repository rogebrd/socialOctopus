import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';


@Component({
  selector: 'page-success',
  templateUrl: 'success.html'
})
export class SuccessPage {

  constructor(public navCtrl: NavController) {
    this.navCtrl.push(SettingsPage);
  }

}
