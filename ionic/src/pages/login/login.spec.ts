import { async, TestBed , ComponentFixture } from '@angular/core/testing';
import {AlertCmp, IonicModule, NavController, NavParams, Platform} from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from "./login";
import {
  PlatformMock,
  NavMock,
  NavParamsMock
} from '../../../test-config/mocks-ionic';
import {ApiProvider} from "../../providers/api/api";
import {ApiProviderMock} from "../../providers/api/api.mock";


describe('LoginPage Component', () => {
  let fixture;
  let component;
  var mock;
  var api;

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
        { provide: NavController, useClass: NavMock},
        { provide: ApiProvider},
        { provide: Boolean, useClass: PlatformMock}
      ]
    }).overrideComponent(LoginPage, {
        set: {
            providers: [
                { provide: ApiProvider, useClass: ApiProviderMock}
            ]
        }
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    mock = TestBed.get(ApiProvider);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should be created', () => {
    expect(component instanceof LoginPage).toBe(true);
    expect(fixture instanceof ComponentFixture).toBe(true);
  });

  it('test login', (done) => {
    //component.setUserData({'username': "wrong", 'password':'info'});
    component.login().then((result) => {
      expect(result).toBe(true);
      done();
    });
});

});
