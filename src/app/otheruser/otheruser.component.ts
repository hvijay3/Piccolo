import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image.service';
import { UploadService } from '../services/upload.service';
import {AngularFireAuth} from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { FollowList } from '../models/followList.model';


@Component({
  selector: 'app-otheruser',
  templateUrl: './otheruser.component.html',
  styleUrls: ['./otheruser.component.css']
})
export class OtheruserComponent implements OnInit {
  /* Get an observable of follow array for logged in user */

  followees: Observable<FollowList[]>; // list of users registered
  private searchUserId: string;
  private loggedInUserId: string;

  constructor(private router: Router, private route: ActivatedRoute, private imageService: ImageService,
    private uploadService: UploadService, private authService: AngularFireAuth) {
      /* Get the logged in user */
      this.authService.authState.subscribe(auth => {     // authState is an observable and we have subscribed to it
        if (auth !== undefined && auth !== null) {
        this.loggedInUserId = auth.uid;
        }
      });
  }

  ngOnInit() {
    console.log('Inside Other-User ');
    this.searchUserId = this.route.snapshot.params['id'];

    this.followees = this.imageService.getFollowees();  // get followees list for the logged in user
    console.log(this.followees);
    this.followees.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        // check if the searchUser is in the followees list for the logged in user
        if (snapshot !== undefined && snapshot.followName !== null && snapshot.followId === this.searchUserId) {
          this.router.navigate(['imagelist/' + this.searchUserId]);
        }
      });
    });
    /* Get the search user name from the user id and also the follow list of logged in user
    if followlist contains search userid then navigate 
    else render html page to follow/ */

    // this.router.navigateByUrl('imagelist/' + this.searchUserId);
  }

  /*Onclick = followbutton write to db (follow array<- search user)
 on successfull write navigate to searched user imagelist */
  onSubmitFollow() {
    // const data = (<HTMLInputElement>document.getElementById('follow')).value;
    const followList: FollowList = new FollowList(this.imageService.getSearchUserName(), this.searchUserId);
    console.log(followList);
    const path = '/followList/' + this.loggedInUserId + '/';
    console.log(path);
    this.uploadService.writeFolloweesData(followList, path);

    this.router.navigate(['imagelist/' + this.searchUserId]);
  }


 /* onclick of home button navigate to home component and reset the value of flag
 Import the imagelist component to access the getter,*/

}
