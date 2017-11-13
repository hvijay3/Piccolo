import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;
  errorMsg: string;
  userId: String;

  constructor(private authService: AuthenticationService, private router: Router, private afAuth: AngularFireAuth) {}

  signIn() {
    this.authService.login({ email: this.email, password: this.password })
      .then(resolve => this.router.navigate(['home'])) // home component
      .catch(error => this.errorMsg = error.message);
  }

  signup() {
    this.router.navigate(['signup']);
  }
   /* wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
   }
 } */
}
