import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
import {AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private loggedInUserId: String;
  constructor(private authService: AngularFireAuth, private router: Router , private authS : AuthenticationService) {
    this.authService.authState.subscribe(auth => {     // authState is an observable and we have subscribed to it
      if (auth !== undefined && auth !== null) {
      this.loggedInUserId = auth.uid;
      }
    });
   }

  ngOnInit() {
    console.log('in home component and user id is' + this.loggedInUserId  );
    this.router.navigate(['imagelist/' + this.loggedInUserId]);
  }

}
