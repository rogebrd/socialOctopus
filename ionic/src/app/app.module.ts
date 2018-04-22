import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { SignupPage } from '../pages/signup/signup';
import { TestingPage } from '../pages/testing/testing';
import { SuccessPage } from '../pages/success/success';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SearchresultsPage } from '../pages/searchresults/searchresults';
import { SettingsPage} from '../pages/settings/settings';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { SocialApiProvider } from '../providers/social-api/social-api';
import {PostPage} from "../pages/post/post";
import {TwitPostProvider} from "../providers/twit-post/twit-post";
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { ViewProfilePage } from '../pages/view-profile/view-profile';
import { ErrorFeedPage } from '../pages/error-feed/error-feed';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    SearchPage,
    SignupPage,
    SuccessPage,
    SearchresultsPage,
    SettingsPage,
    HomePage,
    TestingPage,
    PostPage,
    UserProfilePage,
    ViewProfilePage,
    ErrorFeedPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    SearchPage,
    SignupPage,
    SuccessPage,
    SearchresultsPage,
    SettingsPage,
    HomePage,
    TestingPage,
    PostPage,
    UserProfilePage,
    ViewProfilePage,
    ErrorFeedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    SocialApiProvider,
    TwitPostProvider,
    {provide: Boolean, useValue: false},
  ]
})
export class AppModule {}
