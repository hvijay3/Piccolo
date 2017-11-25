import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  createAccount() {
    this.authService.createAccount({ email: this.email, password: this.password })
      .then(resolve => this.router.navigate(['login']))                 // a popup congratulating successful signup or an error
      .catch(error => this.errorMsg = error.message);
  }
}
