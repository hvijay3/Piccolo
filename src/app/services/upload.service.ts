import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { ImageDetails } from '../models/imageDetails.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Upload } from '../models/upload.model';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

  private rootDir = '/uploads';
  private uploads: FirebaseListObservable<ImageDetails[]>;

  constructor(private ngFire: AngularFireModule, private dbObject: AngularFireDatabase) { }

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
        upload.comment = "Hello";
        console.log('Creation date!: ' + upload.creationDate);
        console.log(upload);
        this.writeUploadData(upload);
      }
    );
  }
  private writeUploadData(upload: Upload) {
    this.dbObject.list(`${this.rootDir}/`).push(upload);
    console.log('File saved!: ' + upload.url);
  }
}
