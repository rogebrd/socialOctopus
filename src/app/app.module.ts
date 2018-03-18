import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PostPage } from "../pages/post/post";
import { TwitPostProvider } from '../providers/twit-post/twit-post';
import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PostPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HTTP
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
    TwitPostProvider,
  ]
})
export class AppModule {}
