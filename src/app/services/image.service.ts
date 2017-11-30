import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {FirebaseApp} from 'angularfire2';
import 'firebase/storage';
import {ImageDetails} from '../models/imagedetails.model';
import { Comment } from '../models/comment.model';
import { UserList } from '../models/userList.model';
import * as firebase from 'firebase';
import { FollowList } from '../models/followList.model';


@Injectable()
export class ImageService  {
  userId: String; // user Id for logged user
  userName: String; // Username of logged in user
  currentUser: String;
  isUserMapped: boolean;  // [TODO] used to enable/disable Nav-bar links
  loggedInUserName: String; // Username of logged in user
  searchUserName: string; // username for the search user

  constructor(private authService: AngularFireAuth, private dbService: AngularFireDatabase) {
    this.authService.authState.subscribe(auth => {     // authState is an observable and we have subscribed to it
      if (auth !== undefined && auth !== null) {
      this.userId = auth.uid;
      }
    });
    this.currentUser = this.userId;
   }

   /** normally observables are associated with return objects which are
                                               asked from server and can take time to process.
                                               In order to use them we need to subscribe to them*/
  getImages(key: String): Observable<ImageDetails[]> {
    this.currentUser = key;
    console.log ('Inside getImages ');
    return this.dbService.list('uploads/' + key + '/');        // here while retrieving we can also send userid with uploads
  }

  /* method to retrieve image specific details using key */
  getImage(key: string) {
    return firebase.database().ref('uploads/' + this.currentUser + '/' + key).once('value')
      .then((snap) => snap.val());
  }

  getUsers(): Observable<UserList[]> {
    return this.dbService.list('userList/');
  }

  getFollowees(): Observable<FollowList[]> {
    return this.dbService.list('followList/' + this.userId + '/');
  }
  getUserId(): String {
    return this.userId;
  }

  // method to retrieve image specific comments using key
  getComments(key: string): Observable<Comment[]> {
    return this.dbService.list('comments/' + key);
  }
  setUserId (uid: string) {
    this.userId = uid;
  }

  // Set the username for logged in user
  setUserName(uname: string){
    this.userName = uname;
    console.log(this.userName);
  }

  // Get the username of logged in user
  getUserName(){
    return this.userName;
  }

  setIsUserMapped(flag: boolean) {
    this.isUserMapped = flag;
  }

  getIsUserMapped() {
    return this.isUserMapped;
  }

  // Set the username for logged in user
  setLoggedInUserName(userName: string) {
    this.loggedInUserName = userName;
    console.log(this.loggedInUserName);
  }

  // Get the username for logged in user
  getLoggedInUserName() {
    return this.loggedInUserName;
  }

  // Set the username for Search User
  setSearchUserName(userName: string) {
    this.searchUserName = userName;
    console.log(this.searchUserName);
  }

  // Get the username for the search user
  getSearchUserName() {
    return this.searchUserName;
  }

  // Get current User. So that we can access the owner of the concerned image while updating database
  getCurrentUserId(){
    return this.currentUser;
  }
}
