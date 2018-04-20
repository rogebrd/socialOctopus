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
      declarations: [MyApp],
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
  });
 
  it('displays the product page to the user', () => {
     expect(component['rootPage']).toBe(LoginPage);
  });

  it('Login wrong credentials', () => {
     component['rootPage'].setUserData();
     component['rootPage'].login();
     let login_status = component['rootPage'].getLoginStatus();
     expect(!login_status).toBeTruthy();
  });

  it('Login right credentials', () => {
     component['rootPage'].setUserData();
     component['rootPage'].login();
     let login_status = component['rootPage'].getLoginStatus();
     expect(login_status).toBeTruthy();
  });

  /*

  it('should be created', () => {
    //expect(component instanceof MyApp).toBe(true);
  });

  it('should have two pages', () => {
    expect(component.pages.length).toBe(2);
  });
  */

});