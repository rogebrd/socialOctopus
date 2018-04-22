import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { LoginPage } from './login';
import { HttpModule } from '@angular/http';

import { NavController,NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ApiProviderMock } from '../../providers/api/api.mock';


import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  NavParamsMock,
  NavMock
} from '../../../test-config/mocks-ionic';

import { LoginPageMock } from  './login.mock';

//let comp0;
//let fixture0;

let comp;//: LoginPageMock;
let fixture;//: ComponentFixture<LoginPage>;
let de;//: DebugElement;
let el;//: HTMLElement;

let api;//: ApiProvider;
let params;//: NavParams;
let navCtrl;//: NavController;

let login;
 
describe('Page: Login Page', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [MyApp, LoginPage],

            imports: [
                IonicModule.forRoot(MyApp),
                HttpModule
            ],

            providers: [
                { provide: StatusBar, useClass: StatusBarMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: Platform, useClass: PlatformMock },
                { provide: NavController, useClass: NavMock},
                { provide: NavParams, useClass: NavParamsMock },
                { provide: LoginPage, useClass: LoginPageMock },
                { provide: ApiProvider, useClass: ApiProviderMock }
            ]
 
        }).compileComponents().
        then(()=>{
            //fixture0 = TestBed.createComponent(LoginPage);
            //comp0    = fixture.componentInstance;
            //fixture0.detectChanges();
            api = TestBed.get(ApiProvider);
            params = TestBed.get(NavParams);
            navCtrl = TestBed.get(NavController);

            login = new LoginPage(api, navCtrl, params);

            fixture = TestBed.createComponent(login);
            comp    = fixture.componentInstance;
            fixture.detectChanges();
        });
 
    }));
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });

    it('should create', () => {
        expect(comp).toBeDefined();
    });

    it('is created', () => {
 
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
 
    });
 
    it('initialises with a title of Login', () => {
        expect(comp['title']).toEqual('Login');
    });
 
    /*
    it('can set the title to a supplied value', () => {
 
        de = fixture.debugElement.query(By.css('ion-title'));
        el = de.nativeElement; 
 
        comp.changeTitle('Your Page');
        fixture.detectChanges();
        expect(comp['title']).toEqual('Your Page');
        expect(el.textContent).toContain('Your Page');
 
    });
    */
 
});