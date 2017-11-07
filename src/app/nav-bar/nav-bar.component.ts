import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {ImageService} from '../services/image.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ImageDetails } from '../models/imageDetails.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title: 'Images';
  user: Observable<firebase.User>;
  images: Observable<ImageDetails[]>;
  // values = '';

  constructor(private authService: AuthenticationService, private router: Router, private imageService: ImageService) { }

  ngOnInit() {
    this.user = this.authService.authUser();
  }

  /* onKey(value: string) {
    this.values += value;
    console.log(this.values);
  } */

  profileSearch() {
    const values = (<HTMLInputElement>document.getElementById('search')).value;
    console.log('Inside profileSearch');
    console.log(values);
    this.imageService.setUserId(values);
    this.router.navigateByUrl('imagelist/' + values);
    // this.images = this.imageService.getImages(values);
  }

  logOut() {
    this.authService.logout().then(onResolve => this.router.navigate['/']);
  }

}
