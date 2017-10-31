import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationService} from '../services/authentication.service';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {SignupComponent} from '../signup/signup.component';
import { By } from '@angular/platform-browser';


fdescribe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let username_html: HTMLInputElement;
  let password_html: HTMLInputElement;
  let signupspy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports : [FormsModule, RouterModule, RouterTestingModule],
      providers: [
        {provide: AuthenticationService, useValue: {}},
        {provide: Router, useValue: {}},
        {provide: AngularFireAuth, useValue: {}}],
        schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const input = fixture.debugElement.queryAll(By.css('input'));
    username_html = input[0].nativeElement;
    password_html = input[1].nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a Signup button tag', async(() => {
    fixture = TestBed.createComponent(SignupComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Create account');
  }));

  it('Initial input for username should be blank', () => {
    expect(username_html.textContent).toEqual('');

  });

  it('Initial input for password should be blank', () => {
    expect(password_html.textContent).toEqual('');

  });

  describe('when the user submits the signup form', () => {
        beforeEach(() => {
          signupspy = spyOn(component, 'createAccount');
          const reg_button = fixture.debugElement.nativeElement.querySelector('button');
          reg_button.click();
        });
        it('should invoke the signup function', async(() => {
          fixture.whenStable().then(() => {
            expect(component.createAccount).toHaveBeenCalled();
          });
        }));
      });


});
