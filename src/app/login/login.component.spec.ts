import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
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


class AuthenticationServiceStub {

  private firepromise: firebase.Promise<any>;

    login() {
        return this.firepromise;
    }

}

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerStub;
  let username_html: HTMLInputElement;
  let password_html: HTMLInputElement;
  let loginspy: jasmine.Spy;

  beforeEach(async(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate'),
    };
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports : [FormsModule, RouterModule, RouterTestingModule],
      providers: [
        {provide: AuthenticationService, useValue: { AuthenticationServiceStub}},
        {provide: Router, useValue: {}},
        {provide: AngularFireAuth, useValue: {}},
        {provide: Router, useValue: routerStub }],
        schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const input = fixture.debugElement.queryAll(By.css('input'));
        username_html = input[0].nativeElement;
        password_html = input[1].nativeElement;
    // AuthenticationService = fixture.debugElement.injector.get(AuthenticationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a Signin button tag', async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    // const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
   // expect(routerStub.navigate).toHaveBeenCalledWith(['/signup']);
    expect(compiled.querySelector('button').textContent).toContain('Sign In');
  }));

  it('Initial input for username should be blank', () => {
    expect(username_html.textContent).toEqual('');

  });

  it('Initial input for password should be blank', () => {
    expect(password_html.textContent).toEqual('');

  });

  describe('when the user submits the signin form', () => {
        beforeEach(() => {
          loginspy = spyOn(component, 'signIn');
          const reg_button = fixture.debugElement.nativeElement.querySelector('button');
          reg_button.click();
        });
        it('should invoke the signIn function', async(() => {
          fixture.whenStable().then(() => {
            expect(component.signIn).toHaveBeenCalled();
          });
        }));
      });
});
