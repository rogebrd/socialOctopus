/*
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { MyApp } from './app.component';
//import { TestingPage } from '../pages/testing/testing';
//import { LoginPage } from '../pages/login/login';
import { MagicBall } from './magic-ball';


import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../test-config/mocks-ionic';

 
let MagicBall = null;
 
describe('Magic 8 Ball Service', () => {
 
    beforeEach(() => {
      magicBall = new MagicBall();
    });
 
    it('should return a non empty array', () => {
 
            let result = magicBall.getAnswers();
 
            expect(Array.isArray(result)).toBeTruthy;
            expect(result.length).toBeGreaterThan(0);
        }
    );
 
    it('should return one random answer as a string', () => {
            expect(typeof magicBall.getRandomAnswer()).toBe('string');
        }
    );
 
    it('should have both yes and no available in result set', () => {
 
            let result = magicBall.getAnswers();
 
            expect(result).toContain('Yes');
            expect(result).toContain('No');
 
        }
    );
 
});
*/