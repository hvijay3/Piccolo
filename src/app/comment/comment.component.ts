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

  constructor(private imageService: ImageService, private route: ActivatedRoute, private uploadService: UploadService) {
  }

  ngOnInit() {
    this.keyi = this.route.snapshot.params['id'];
    console.log('keyi value is' + this.keyi);
    this.comments = this.imageService.getComments(this.keyi);
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
    const user = this.imageService.getUserId();
    // console.log(user);
    this.comment.author = user.toString();
    this.comment.data = data;
    // console.log(this.comment);
    const path = '/comments/' + this.keyi;
    // console.log(path);
    // console.log('calling write method');
    this.uploadService.writeCommentData(this.comment, path);
    this.displaycomment();
  }



}
