import { Component, TemplateRef } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'hq-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent {


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
