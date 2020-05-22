import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NbLoginComponent, NbAuthService, NbAuthSocialLink, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'hq-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent{
  
  constructor(protected service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options, protected cd: ChangeDetectorRef, protected router: Router){
    super(service, options, cd, router);
   
    this.service.isAuthenticated().subscribe(
      (res: any) => {
        if (res) this.router.navigateByUrl("/app/");
      },
      (err: any) => {
        console.log(err);
      }
    );

  }
  


}
