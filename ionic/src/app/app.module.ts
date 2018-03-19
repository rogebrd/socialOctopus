import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { SignupPage } from '../pages/signup/signup';
import { SuccessPage } from '../pages/success/success';
import {HttpModule } from '@angular/http';
import { SearchresultsPage } from '../pages/searchresults/searchresults';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SearchPage,
    SignupPage,
    SuccessPage,
    SearchresultsPage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SearchPage,
    SignupPage,
    SuccessPage,
    SearchresultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
   
  ]
})
export class AppModule {}