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

  selectedFiles: FileList; // to allow selection of multiple files for upload at a time.
  currentUpload: Upload;

  // injects the upload service
  constructor(private uploadService: UploadService) { }

  // listens to the change event when a user selects an input file
  manageFiles (event) {
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    const filesToBeUploaded = this.selectedFiles;
    // console.log(_.range(filesToBeUploaded.length));
    const filesIndex = _.range(filesToBeUploaded.length);
    _.each(filesIndex, (index) => {
      // console.log(filesToBeUploaded[index]);
      this.currentUpload = new Upload(filesToBeUploaded[index]);
      this.uploadService.uploadFile(this.currentUpload);
    });
  }
}

