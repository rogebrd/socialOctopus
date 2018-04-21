import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { LoginPage } from './login';
import { HttpModule } from '@angular/http';

import { NavController,NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
 
let comp: LoginPage;
let fixture: ComponentFixture<LoginPage>;
let de: DebugElement;
let el: HTMLElement;

let api: ApiProvider;
let params: NavParams;
let navCtrl: NavController;
 
describe('Page: Login Page', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [MyApp, LoginPage],
 
            providers: [
 
            ],
 
            imports: [
                IonicModule.forRoot(MyApp),
                HttpModule
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPage);
        comp    = fixture.componentInstance;
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
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