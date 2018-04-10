import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PostPage } from "../pages/post/post";
import { TwitPostProvider } from '../providers/twit-post/twit-post';

import { HttpModule } from '@angular/http';

import { TwitterConnect } from '@ionic-native/twitter-connect';
import { TwitterService } from 'ng2-twitter';
import { TumblrpostProvider } from '../providers/tumblrpost/tumblrpost';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PostPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PostPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Boolean, useValue: false},
    TwitterConnect,
    TwitterService,
    TwitPostProvider,
    TumblrpostProvider,
  ]
})
export class AppModule {}
