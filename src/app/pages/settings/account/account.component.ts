import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { AdminService } from '../../../@core/utils';
import { AuthenticationService } from '../../../@core/utils/authentication.service';
import { CryptoService } from '../../../@core/utils/crypto.service';

@Component({
  selector: 'hq-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit , OnDestroy{

  private user: any = "anonymous";
  private subUser: any;
  private subVerif: any;

  constructor(
    protected adminS: AdminService,
    protected authS: AuthenticationService,
    protected cryptoS: CryptoService,
    protected toastrS: NbToastrService,
  ) { 
  }

  ngOnInit() {
    this.getConnected();
  }

  getConnected() {
    this.subUser = this.authS.getConnected().subscribe((r: any) => {

      let res = this.cryptoS.decrypt(r["encrypted"]);

      if (res && this.user != res["user"]) this.user = JSON.parse(res["user"]);
      else this.authS.logout("/");

    }, (e: any) => {
      console.error(e);
    });

  }

  public verifyMail(): any {
    this.getConnected();
    if (!this.user.mailVerified) {
      this.subVerif=this.adminS.verifyEmail(this.user.idUser).subscribe(
        (res)=>{
          this.showToast(
            'Information',
            res["encrypted"],
            'info', 'bottom-right', 'email-outline');
          
        },(err)=>{
          this.showToast(
            'Email is not sent',
            err.error["encrypted"],
            'danger', 'bottom-right', 'email-outline');
        }

      );
    
        
    }
    
  }

  showToast(title:string, content:string, status, position, icon) {

    let _defaultConfig: Partial<NbToastrConfig> = {
      position, duration: 9000, destroyByClick: true, status, hasIcon: true, icon, iconPack: 'eva'
    }

    this.toastrS.show(
      content,
      title,
      _defaultConfig);
  }

  ngOnDestroy(): void {
    if (this.subUser) this.subUser.unsubscribe();
    if (this.subVerif) this.subVerif.unsubscribe();
  }

}
