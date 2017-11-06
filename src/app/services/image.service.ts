import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {FirebaseApp} from 'angularfire2';
import 'firebase/storage';
import {ImageDetails} from '../models/imagedetails.model';
import * as firebase from 'firebase';


@Injectable()
export class ImageService  {
  userId: String; // user Id for logged user
  constructor(private authService: AngularFireAuth, private dbService: AngularFireDatabase) {
    this.authService.authState.subscribe(auth => {     // authState is an observable and we have subscribed to it
      if (auth !== undefined && auth !== null) {
      this.userId = auth.uid;
      }
    });
   }

   /** normally observables are associated with return objects which are
                                               asked from server and can take time to process.
                                               In order to use them we need to subscribe to them*/
  getImages(): Observable<ImageDetails[]> {
  return this.dbService.list('uploads/' + this.userId + '/');        // here while retrieving we can also send userid with uploads
  }

  /* method to retrieve image specific details using key */
  getImage(key: string) {
    return firebase.database().ref('uploads/' + this.userId + '/' + key).once('value')
      .then((snap) => snap.val());
  }
  getUserId(): String {
    return this.userId;
  }
}
