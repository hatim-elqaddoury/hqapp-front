
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { AdminService } from '../../@core/utils';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { title } from '../../@core/mock/conf';
import { CryptoService } from '../../@core/utils/crypto.service';

@Component({
  selector: 'hq-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private selectedFile: File;
  private user: any;
  private subUsers: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminS: AdminService,
    private cryptoS: CryptoService,
    private titleService: Title) {
    //Gets the idUSer from the url paramaeters.

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      let idUser: any = this.route.snapshot.params.id;
      this.getUser(idUser);
    }, err => {
      console.log(err);
    });
  }


  ngOnInit() {
   // console.log(this.user);
  }

  //Gets the the user to show its profile.
  getUser(id: String):any{
    if (!id) this.user = "notfound";
    else this.subUsers = this.adminS.getUser(id).subscribe(
    (res:any) => {
        this.user = this.cryptoS.decrypt(res["encrypted"]);
        
      if (!this.user) this.user = "notfound";
      else this.titleService.setTitle(this.user.fullname + "・" + title.value);
      return this.user;
    }, 
    (err:any)=>{
        this.user = "notfound";
        return this.user;
    });
    return this.user;
  }
  

  //Gets called when the user selects an image
  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  public onUpload(): any {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.user.idUser);
    
    this.adminS.updateUserAvatar(uploadImageData).subscribe(res=>{
      this.user = res;
    });

  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  /*getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get(this.server + 'image/get/' + this.imageName, { headers: { 'HQ-authorise': this.authS.getToken() } })
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }*/


  ngOnDestroy() {
    this.titleService.setTitle(title.value);
    this.subUsers.unsubscribe();
    
  }
}
