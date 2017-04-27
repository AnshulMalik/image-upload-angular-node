import { Component } from '@angular/core';
import { UploadService } from './services/upload.service';

@Component({
  selector: 'my-app',
  templateUrl: './form.component.html',
  providers: [ UploadService ]
})
export class AppComponent { 

  constructor(private uploadService: UploadService) {
    this.files = null;
    this.result = '';
    this.acceptedTypes = ['image/jpeg', "image/jpg", "image/gif", "image/png"];
  }

  onChange(event) {
    const files = event.srcElement.files;
    const type = files[0].type;
    if(this.acceptedTypes.indexOf(type) === -1) {
      this.files = null;
      return alert('Please select an image');
    }

    this.files = files;
  }

  onSubmit() {
    if(!this.files) {
      return alert('Please select an image file');
    }

    this.uploadService.makeFileRequest('http://localhost:3000/upload',this.files).subscribe((response) => {
      this.result = JSON.stringify(response);
      
    }, (err) => {
        console.log(err);
    });
  }
}
