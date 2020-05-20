import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../../../@core/utils/authentication.service';

@Component({
  selector: 'hq-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit, OnDestroy {

  constructor(private httpClient: HttpClient, private authS: AuthenticationService) { }
  
  ngOnInit() {}

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  progress: any = 0;
  private server = window["cfgApiBaseUrl"];

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile);

    console.log(uploadImageData );

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post(this.server + 'image/upload', uploadImageData, { headers: { 'HQ-authorise': this.authS.getToken() }, responseType: 'text'}  )
      .subscribe( r => {
        let res:any = r;
        console.log(res);

      });
  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get(this.server + 'image/get/' + this.imageName, { headers: { 'HQ-authorise': this.authS.getToken() } })
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
  
  ngOnDestroy(){

  }

}
