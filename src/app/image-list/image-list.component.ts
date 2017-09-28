import { Component, OnInit } from '@angular/core';
import {ImageService} from '../services/image.service';
import {Observable} from 'rxjs/Observable';
import { ImageDetails } from '../models/imageDetails.model';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  imageList: Observable<ImageDetails[]>;

  constructor(private imageService: ImageService) {  }

  ngOnInit() {
    this.imageList = this.imageService.getImages();
  }

}
