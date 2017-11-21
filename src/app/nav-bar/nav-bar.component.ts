import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {ImageService} from '../services/image.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ImageDetails } from '../models/imageDetails.model';
import { UserList } from '../models/userList.model';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title: 'Images';
  user: Observable<firebase.User>;
  images: Observable<ImageDetails[]>;
  searchUserId: String;
  loggedUserId: String;
  isUserMapped: boolean;
  private hComp: HomeComponent;
  // values = '';

  constructor(private authService: AuthenticationService, private router: Router,
     private imageService: ImageService, private authFireService: AngularFireAuth) {
    this.authFireService.authState.subscribe(auth => {     // authState is an observable and we have subscribed to it
      if (auth !== undefined && auth !== null) {
      this.loggedUserId = auth.uid;
      }
    });
   }

  ngOnInit() {
    this.user = this.authService.authUser();
    // this.isUserMapped = this.hComp.isUserSet;
  }

  /* onKey(value: string) {
    this.values += value;
    console.log(this.values);
  } */

  isUsernameSet() {
    return this.hComp.isUserSet;
  }

  profileSearch() {
    this.searchUserId = (<HTMLInputElement>document.getElementById('search')).value;
    console.log('Inside profileSearch ' + this.searchUserId);
   // this.imageService.setUserId(values);
   // Map the username to userid again
    this.router.navigateByUrl('otheruser/' + this.searchUserId );
    // this.images = this.imageService.getImages(values);
  }

  logOut() {
    this.authService.logout().then(onResolve => this.router.navigate['/']);
  }


}
