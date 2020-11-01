import { Component, TemplateRef } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
<<<<<<< Updated upstream
=======
import { Router } from '@angular/router';
import { CryptoService } from '../../@core/utils/crypto.service';
>>>>>>> Stashed changes

@Component({
  selector: 'hq-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent {

<<<<<<< Updated upstream
=======
  constructor(
    protected service: NbAuthService, 
    @Inject(NB_AUTH_OPTIONS) protected options, 
    protected cd: ChangeDetectorRef, 
    protected router: Router,
    private cryptoS: CryptoService,
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
>>>>>>> Stashed changes


  private encrypt(data: any): any {
    return this.cryptoS.encrypt(data) != null ? this.cryptoS.encrypt(data)["encrypted"] : "undefined";
  }

  private decrypt(data: any): any {
    return this.cryptoS.decrypt(data) != null ? this.cryptoS.decrypt(data)["decrypted"] : "undefined";
  }

  private encryptJson(data: any): any {
    console.log("encryptJson", this.cryptoS.encrypt(data).encrypted);
    return this.cryptoS.encrypt(data);
  }

  private decryptJson(data: any): any {
    console.log("decryptJson", this.cryptoS.decrypt(data));
    
    return this.cryptoS.decrypt(data);
  }

  private dialogService: NbDialogService;

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
