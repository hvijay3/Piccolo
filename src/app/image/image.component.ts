import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ActivatedRoute } from '@angular/router';
import { ImageDetails } from '../models/imageDetails.model';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Upload } from '../models/upload.model';
import { UploadService } from '../services/upload.service';
import { Comment } from '../models/comment.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  private imageUrl = '';
  private objRef = '';
  private rootDir = '';
  private ngFire: AngularFireModule;
  private dbObject: AngularFireDatabase;
  private fileUpload: ImageDetails;
  likes = 0;

  constructor(private imageService: ImageService, private route: ActivatedRoute, private uploadService: UploadService) { }

  getUrl(key: string) {
    this.imageService.getImage(key)
      .then(image => this.imageUrl = image.url);
  }

  getFileUpload(key: string) {
    this.imageService.getImage(key)
      .then(imageUpload => this.fileUpload = imageUpload);
  }

  ngOnInit() {
    this.getUrl(this.route.snapshot.params['id']);
    this.getFileUpload(this.route.snapshot.params['id']);
    this.get_likes();
  }

  // Method to get the number of likes from database
  get_likes(){
    const keyi = this.route.snapshot.params['id'];
    this.imageService.getImage(keyi)
    .then(imageObj => this.likes = imageObj.like);
  }

  deleteFileUpload() {
    console.log(this.route.snapshot.params['id']);
    console.log(this.fileUpload.name);
    console.log(this.fileUpload);
    console.log('inside deleteFileUpload');
    this.uploadService.removeUpload(this.fileUpload, this.route.snapshot.params['id']);
  }

  likeImage() {
    const element = <HTMLInputElement> document.getElementById("checkbox");
    const isChecked = element.checked;
    const keyi = this.route.snapshot.params['id'];
    const user = this.imageService.getCurrentUserId();               // returns logged-in userid
    const db = firebase.database();
    console.log(isChecked);
    if(isChecked){
      const count = this.likes + 1;
      db.ref('/uploads' + '/' + user + '/' + keyi).update({like: count});
    }
    else{
      const count = this.likes - 1;
      db.ref('/uploads' + '/' + user + '/' + keyi).update({like: count});
    }    
    this.get_likes();
  }

  // dislikeImage() {
  //   const keyi = this.route.snapshot.params['id'];
  //   console.log(this.fileUpload.dislike);
  //   const count = this.fileUpload.dislike + 1;
  //   console.log(count);
  //   const user = this.imageService.getUserId();
  //   const db = firebase.database();
  //   console.log('/uploads' + '/' + user + '/' + keyi);
  //   db.ref('/uploads' + '/' + user + '/' + keyi).update({dislike: count});
  // }

}
