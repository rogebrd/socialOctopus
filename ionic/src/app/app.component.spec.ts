import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { TestingPage } from '../pages/testing/testing';
import { LoginPage } from '../pages/login/login';

import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../test-config/mocks-ionic';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, LoginPage],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  afterEach(() =>{
    fixture.destroy();
    component = null;
  })

  it('is created', () => {
     expect(fixture).toBeTruthy();
     expect(component).toBeTruthy();
     console.log(component);
     console.log(fixture);
  });
 
  it('displays the product page to the user', () => {
     console.log(component['rootPage']);
     //console.log(component[].pages[0]);
     expect(component['rootPage']).toBe(LoginPage);
  });

  
  it('should return login status false', () => {
     //spyOn(component['rootPage'], 'getLoginStatus');
    // LoginPage.

     let login_status = component['rootPage'].getLoginStatus();
     expect(login_status).toBeFalsy;
  });

  
  /*
  it('Login wrong credentials', () => {
     //let userInfo = {"username":"wrong","password":"info"};
     spyOn(component['rootPage'], "login"):
     LoginPage[setUserData({"username":"wrong","password":"info"})];
     LoginPage[login()];
     let login_status = LoginPage[getLoginStatus()];
     expect(login_status).toBeFalsy();
  });

  it('Login right credentials', () => {
     component['rootPage'].setUserData({"username":"bradrogers","password":"brad"});
     component['rootPage'].login();
     let login_status = component['rootPage'].getLoginStatus();
     expect(login_status).toBeTruthy();
  });
  */

  /*

  it('should be created', () => {
    //expect(component instanceof MyApp).toBe(true);
  });

  it('should have two pages', () => {
    expect(component.pages.length).toBe(2);
  });
  */

});