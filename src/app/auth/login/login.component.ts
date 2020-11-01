import { Component, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'hq-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent{
<<<<<<< Updated upstream
      
=======
  
  constructor(protected service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options, protected cd: ChangeDetectorRef, protected router: Router){
    super(service, options, cd, router);
   
    this.service.isAuthenticated().subscribe(
      (res: any) => {
        if(res) this.router.navigateByUrl("/app/");
      },
      (err: any) => {
        console.log(err);
      }
    ).unsubscribe();;
  }

>>>>>>> Stashed changes
}
