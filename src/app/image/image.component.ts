import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ActivatedRoute } from '@angular/router';
import { ImageDetails } from '../models/imageDetails.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  private imageUrl = '';

  constructor(private imageService: ImageService, private route: ActivatedRoute) { }

  getUrl(key: string) {
    this.imageService.getImage(key)
      .then(image => this.imageUrl = image.url);
  }

  ngOnInit() {
    this.getUrl(this.route.snapshot.params['id']);
  }
}
