import { Component, TemplateRef, ChangeDetectorRef, Inject } from '@angular/core';
import { NbRegisterComponent, NbAuthService, NB_AUTH_OPTIONS, NbLogoutComponent } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { CryptoService } from '../../@core/utils/crypto.service';
import { AuthenticationService } from '../../@core/utils/authentication.service';

@Component({
  selector: 'hq-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent {

  constructor(
      protected service: NbAuthService, 
      @Inject(NB_AUTH_OPTIONS) protected options, 
      protected cd: ChangeDetectorRef, 
      protected router: Router,
      protected cryptoS: CryptoService,
      protected authService: NbAuthService,
      protected authS: AuthenticationService
  ){

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

  /**
   * important to register
   */
  public RegisterAndLogout(): any {
    this.register();
    this.authService.logout("email");
  }


  public encrypt(data: any): any {
    return this.cryptoS.encrypt(data) != null ? this.cryptoS.encrypt(data)["encrypted"] : "undefined";
  }

  public decrypt(data: any): any {
    return this.cryptoS.decrypt(data) != null ? this.cryptoS.decrypt(data)["decrypted"] : "undefined";
  }

  public encryptJson(data: any): any {
    console.log("encryptJson", this.cryptoS.encrypt(data).encrypted);
    return this.cryptoS.encrypt(data);
  }

  public decryptJson(data: any): any {
    console.log("decryptJson", this.cryptoS.decrypt(data));
    return this.cryptoS.decrypt(data);
  }


  public dialogService: NbDialogService;
  openD(dialog: TemplateRef<any>) {
    if (this.dialogService != null || this.dialogService != undefined) {
      this.dialogService.open(
        dialog,
        {
          hasBackdrop: true,
          closeOnBackdropClick: true,
          closeOnEsc: true,
          autoFocus: false,
        }
      );
      //.onClose.subscribe(v => console.log(v));
    }
  }

}
