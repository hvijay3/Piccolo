import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { UploadService } from '../services/upload.service';
import { Comment } from '../models/comment.model';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {
  private rootDir = '';
  private keyi = '';
  comment: Comment =  new Comment();
  comments: Observable<Comment[]>;
  private dbObject: AngularFireDatabase;
  private userName = '';

  constructor(private imageService: ImageService, private route: ActivatedRoute, private uploadService: UploadService) {
    this.userName = this.imageService.getUserName().toString();
  }

  ngOnInit() {
    this.keyi = this.route.snapshot.params['id'];
    console.log('keyi value is' + this.keyi);
    this.comments = this.imageService.getComments(this.keyi);
    //this.userName = this.imageService.getUserName().toString();
  }

  displaycomment() {
    this.comments = this.imageService.getComments(this.keyi);
    console.log('Comments are' + this.comments);
  }

  addComment() {
    // console.log('Image key is :' + this.route.snapshot.params['id']);
    const data = (<HTMLInputElement>document.getElementById('comment')).value;
    // console.log(data);
    // console.log('Inside addComment');
    const user = this.imageService.getUserId();// Need to be used for navigating to the imagelist of user
    // console.log(user);
    this.comment.author = this.userName;  
    this.comment.data = data;
    // console.log(this.comment);
    const path = '/comments/' + this.keyi;
    this.uploadService.writeCommentData(this.comment, path);
    this.displaycomment();
    console.log(this.comment.timestamp);
    console.log(this.imageService.getUserName());
    // Reset the value of textbox
    (<HTMLInputElement>document.getElementById('comment')).value = "";
  }



}
