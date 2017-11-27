import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
import {ImageService} from '../services/image.service';
import { UploadService } from '../services/upload.service';
import { UserList } from '../models/userList.model';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /* Declare username variable */
  users: Observable<UserList[]>; // list of users
  username: string;
  isUserSet: boolean;
  private loggedInUserId: string;
  constructor(private authService: AngularFireAuth, private router: Router,
    private authS: AuthenticationService, private imageService: ImageService,
    private uploadService: UploadService, private db: AngularFireDatabase) {
    this.authService.authState.subscribe(auth => {     // authState is an observable and we have subscribed to it
      if (auth !== undefined && auth !== null) {
      this.loggedInUserId = auth.uid;
      }
    });
    
    // console.log('Logged in user is ' + this.loggedInUserId);
    // console.log('Logged in user using ImageService is ' + this.imageService.getUserId);
    // console.log(this.users);
   }
  
  ngOnInit() {
    console.log('in home component and user id is' + this.loggedInUserId  );
    // this.isUserSet = true;
    this.users = this.imageService.getUsers();
    console.log(this.users);
    this.users.subscribe(snapshots => {
      snapshots.forEach(snapshot => {         
        if (snapshot !== undefined && snapshot.userName !== null
          && snapshot.userId === this.loggedInUserId) {// try removing username !== null check
            this.imageService.setUserName(snapshot.userName);
            this.username = snapshot.userName;
            this.router.navigate(['imagelist/' + this.loggedInUserId]);
        }
      });
    });
    // this.isUserSet = false;
    this.wait(500);
    /* Check if username is set for cuurent logged in userid is set in the db. 
    Only if it is set navigate to imagelist else set the username variable and render html for getting username*/
  }

  wait(ms) {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
   }
 }

  /* Onclick submit of username write to db.Create 1 userlist model */
  onSubmitUsername() {
    const data = (<HTMLInputElement>document.getElementById('username')).value;
    const userList: UserList = new UserList(data, this.loggedInUserId);
    const path = '/userList/';
    this.uploadService.writeUserNameData(userList, path);
    this.username = data; 
    // Set the username field in image service so that it can be retrieved later without querying to database.
    this.imageService.setUserName(data.toString());
    // this.isUserSet = true;
    this.router.navigate(['imagelist/' + this.loggedInUserId]);
  }

  getUserName() {
    return this.username;
  }
} 
