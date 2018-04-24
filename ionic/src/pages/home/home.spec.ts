import { async, TestBed , ComponentFixture } from '@angular/core/testing';
import {AlertCmp, IonicModule, NavController, NavParams, Platform} from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Http } from '@angular/http';
import { HomePage } from "./home";
import {
  PlatformMock,
  NavMock,
  NavParamsMock
} from '../../../test-config/mocks-ionic';
import {ApiProvider} from "../../providers/api/api";
import {ApiProviderMock} from "../../providers/api/api.mock";


describe('HomePage Component', () => {
  let fixture;
  let component;
  var mock;
  var api;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage)
      ],
      providers: [
        { provide: Platform, useClass: PlatformMock },
        { provide: NavController, useClass: NavMock},
        { provide: NavParams, useClass: NavParamsMock},
        { provide: NavController, useClass: NavMock},
        { provide: ApiProvider},
        { provide: Boolean, useClass: PlatformMock},
        { provide: Http}
      ]
    }).overrideComponent(HomePage, {
        set: {
            providers: [
                { provide: ApiProvider, useClass: ApiProviderMock}
            ]
        }
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    mock = TestBed.get(ApiProvider);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should be created', () => {
    expect(component instanceof HomePage).toBe(true);
    expect(fixture instanceof ComponentFixture).toBe(true);
  });


});
