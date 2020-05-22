import { Component, TemplateRef, ChangeDetectorRef, Inject } from '@angular/core';
import { NbRegisterComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'hq-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent {

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
