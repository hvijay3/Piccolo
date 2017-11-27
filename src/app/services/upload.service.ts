import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { ImageDetails } from '../models/imageDetails.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Upload } from '../models/upload.model';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ImageService } from './image.service';
import { Comment } from '../models/comment.model';
import { UserList } from '../models/userList.model';
import { FollowList } from '../models/followList.model';


@Injectable()
export class UploadService {
  private userId: String;
  private rootDir = '';
  private uploads: FirebaseListObservable<ImageDetails[]>;

  constructor(private ngFire: AngularFireModule, private dbObject: AngularFireDatabase,
    private imageService: ImageService, private router: Router) {
      this.userId = imageService.getUserId();
    this.rootDir = '/uploads/' + this.userId;
   }

  uploadFile(upload: Upload) {
    // create a root reference
    const storageRef = firebase.storage().ref();

    // string interpolation for reference to the location where the file is to be stored
    const uploadTask = storageRef.child(`${this.rootDir}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      // three observers registered
      // 1. 'state_changed' observer, called any time the state changes such as progress, pause or resume
      (snapshot) => {
        // upload in progress
        upload.status = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log('Upload is ' + upload.status + '% done');
      },
      // 2. Handles unsuccessful uploads
      (error) => {
        console.log(error);
      },
      // 3. Successful Uploads
      (): any => {
        // sets the properties for the Upload Model
       // upload.creationDate = new Date();
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        // upload.comment = 'Hello';
        // Set default value for like and dislike
        upload.like = 0;
        upload.dislike = 0;
       // upload.comment = null;
        console.log('Creation date!: ' + upload.creationDate);
        console.log(upload);
        this.writeUploadData(upload);
      }
    );
  }
  // Writes the file details to real time database
  private writeUploadData(upload: Upload) {
    this.dbObject.list(`${this.rootDir}/`).push(upload);
    console.log('File saved!: ' + upload.url);
   // this.router.navigate(['imagelist/' + this.userId]);
  }

  removeUpload(upload: ImageDetails, key: string) {
    this.deleteUploadData(key)
    .then( () => {
      this.deleteUploadStorage(upload.name);
    });
  }

  // Deletes the file details from the realtime database
  private deleteUploadData(key: string) {
    return this.dbObject.list(`${this.rootDir}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteUploadStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.rootDir}/${name}`).delete();
    this.router.navigate(['imagelist/' + this.userId]);
  }

  // method to write commentdata into database
  writeCommentData(comment: Comment, path: string) {
    this.dbObject.list(path).push(comment);
    console.log('Comment saved!: ' + comment);
  }

  // method to map UserName data into database for the corressponding UID
  writeUserNameData(userList: UserList, path: string) {
    this.dbObject.list(path).push(userList);
    console.log('Username saved!: ' + userList);
  }

  // method to store followees list data into database for the logged in user
  writeFolloweesData(followList: FollowList, path: string) {
    this.dbObject.list(path).push(followList);
    console.log('Username saved!: ' + followList);
  }
}
