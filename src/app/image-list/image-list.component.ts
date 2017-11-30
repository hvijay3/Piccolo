import { Component, OnInit , OnChanges } from '@angular/core';
import {ImageService} from '../services/image.service';
import {Observable} from 'rxjs/Observable';
import { ImageDetails } from '../models/imageDetails.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  images: Observable<ImageDetails[]>;
  private userId: String;
  private currentUserName: String;
  private text: String;
  /* Get logged in user in a variable using home component constructor code
  Set a flag and geeter method for that. Setter method for resettong the flag*/

  constructor(private imageService: ImageService , private route: ActivatedRoute) {  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    console.log('Inside image-list ' + this.userId);
    /* set a flag if current_userid != loggedin userid */
    // this.images = null;
    this.images = this.imageService.getImages(this.userId);           // pass user id here
    this.isCurrentUserLoggdeInUser();
    console.log('After service call ' + this.userId);
  }

  isCurrentUserLoggdeInUser() {
    const loggedInUserId = this.imageService.getUserId();
    const searchUserId = this.imageService.getCurrentUserId();

    if (loggedInUserId === searchUserId ) {
      this.currentUserName = 'Welcome ' + this.imageService.getUserName();
    } else {
      this.currentUserName = 'ImageList for ' + this.imageService.getSearchUserName();
    }
  }
}
