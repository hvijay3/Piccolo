import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { Upload } from '../models/upload.model';
import * as _ from 'lodash'; // allows easy looping over an array of files

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  files: FileList; // to allow selection of multiple files for upload at a time.
  upload: Upload;

  // injects the upload service
  constructor(private uploadService: UploadService) { }

  manageFiles (event) {
    this.files = event.target.files;
  }

  uploadFiles() {
    const filesToBeUploaded = this.files;
    // console.log(_.range(filesToBeUploaded.length));
    const filesIndex = _.range(filesToBeUploaded.length);
    _.each(filesIndex, (index) => {
      // console.log(filesToBeUploaded[index]);
      this.upload = new Upload(filesToBeUploaded[index]);
      this.uploadService.uploadFile(this.upload);
    });
  }
}

