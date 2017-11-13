import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {ImageService} from '../services/image.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ImageDetails } from '../models/imageDetails.model';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title: 'Images';
  user: Observable<firebase.User>;
  images: Observable<ImageDetails[]>;
  userIdValue: String;
  // values = '';

  constructor(private authService: AuthenticationService, private router: Router,
     private imageService: ImageService, private authFireService: AngularFireAuth) {
    this.authFireService.authState.subscribe(auth => {     // authState is an observable and we have subscribed to it
      if (auth !== undefined && auth !== null) {
      this.userIdValue = auth.uid;
      }
    });
   }

  ngOnInit() {
    this.user = this.authService.authUser();
  }

  /* onKey(value: string) {
    this.values += value;
    console.log(this.values);
  } */

  profileSearch() {
    this.userIdValue = (<HTMLInputElement>document.getElementById('search')).value;
    console.log('Inside profileSearch');
    console.log(this.userIdValue);
   // this.imageService.setUserId(values);
    this.router.navigateByUrl('otheruser/' + this.userIdValue );
    // this.images = this.imageService.getImages(values);
  }

  logOut() {
    this.authService.logout().then(onResolve => this.router.navigate['/']);
  }


}
