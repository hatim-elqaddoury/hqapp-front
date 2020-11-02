import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NbLoginComponent, NbAuthService, NbAuthSocialLink, NB_AUTH_OPTIONS, NbAuthResult } from '@nebular/auth';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from '../../@core/utils/authentication.service';
import { CryptoService } from '../../@core/utils/crypto.service';


@Component({
  selector: 'hq-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent{
  
  constructor(
      protected authService: NbAuthService, 
      @Inject(NB_AUTH_OPTIONS) protected options, 
      protected cd: ChangeDetectorRef, 
      protected router: Router,
      protected authS: AuthenticationService,
      protected _socialAuthS: AuthService,
      protected cryptoS: CryptoService,
    ){

    super(authService, options, cd, router);
   
    this.authService.isAuthenticated().subscribe(
      (res: any) => {
        if(res) this.router.navigateByUrl("/app/");
      },
      (err: any) => {
        console.log(err);
      }
    ).unsubscribe();;
  }

  loginGoogle():void{

    let plateform = GoogleLoginProvider.PROVIDER_ID;
    this._socialAuthS.signIn(plateform).then((res)=>{
      this.user.userName = res['firstName'];
      this.user.fullName = res['name'];
      this.user.password = res['id'];
      this.user.login = res['email'];
      this.user.avatar = res['photoUrl'];
      this.authS.loginGoogle(this.cryptoS.encrypt(this.user)).subscribe((res) => {
        this.login();
      }, (err) => {
        console.error(err);
      });
    });
  }

  logoutGoogle(): void {
    console.log(this.user);
    
    //this._socialAuthS.signOut(true);
  }

  

}
