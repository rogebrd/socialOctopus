import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { AlertCmp, IonicModule, NavController, NavParams, Platform} from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ApiProvider} from "../../providers/api/api";

import { LoginPage } from "./login";
import {
  PlatformMock,
  NavMock,
  NavParamsMock
} from '../../../test-config/mocks-ionic';
import { ApiProviderMock } from '../../providers/api/api.mock';



describe('LoginPage Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(LoginPage)
      ],
      providers: [
        { provide: Platform, useClass: PlatformMock },
        { provide: NavController, useClass: NavMock},
        { provide: NavParams, useClass: NavParamsMock},
        { provide: ApiProvider, useClass: ApiProviderMock },
        { provide: Boolean, useClass: PlatformMock},

      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
    //de = null;
    //el = null;
  });

  it('should be created', () => {
    expect(component instanceof LoginPage).toBe(true);
    expect(fixture instanceof ComponentFixture).toBe(true);
  });

  it('login status', () => {
    //let login = component instanceof LoginPage;  
    let login_status = component.getLoginStatus();
    expect(login_status).toBe(false);
  });

  it('Login wrong credentials', () => {
     //let userInfo = {"username":"wrong","password":"info"};
     //spyOn(component['rootPage'], "login"):
     //component.setUserData({"username":"wrong","password":"info"});
     component.login();
     let login_status = component.getLoginStatus();
     expect(login_status).toBeFalsy();
  });

});
