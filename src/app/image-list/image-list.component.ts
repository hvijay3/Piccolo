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

  constructor(private imageService: ImageService , private route: ActivatedRoute) {  }

  ngOnInit() {
    console.log('Inside image-list');
    this.userId = this.route.snapshot.params['id'];
    this.images = this.imageService.getImages(this.userId);           // pass user id here
  }
}
