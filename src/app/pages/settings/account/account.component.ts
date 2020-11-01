import { Component, OnDestroy, OnInit } from '@angular/core';
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
    private adminS: AdminService,
    private authS: AuthenticationService,
    private cryptoS: CryptoService,
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
    console.log(this.user);
    
    if (!this.user.mailVerified) this.subVerif=this.adminS.verifyEmail(this.user.idUser).subscribe(); 
  }

  ngOnDestroy(): void {
    if (this.subUser) this.subUser.unsubscribe();
    if (this.subVerif) this.subVerif.unsubscribe();
  }

}
