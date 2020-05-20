import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NbAuthComponent, NbAuthService } from '@nebular/auth';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterTermsComponent } from './register/register-terms/register-terms.component';
import { AuthGuard } from '../@core/utils';
import { Title } from '@angular/platform-browser';

export const routes: Routes = [
    // .. here goes our components routes
    {
        path: '',
        component: NbAuthComponent,  // <---
        children: [
            {
                path: 'login',
                component: LoginComponent, // <---
            },
            {
                path: 'register',
                component: RegisterComponent, // <---
            },
            {
                path: 'register/terms',
                component: RegisterTermsComponent, // <---
            },
            {
                path: '',
                redirectTo: 'login', // <---
                pathMatch: 'full',
            },
            {
                path: '**',
                redirectTo: 'login', // <---
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HQAuthRoutingModule {
    
    constructor(private authService: NbAuthService, private route: Router, private titleService:  Title){

        this.titleService.setTitle(this.titleService.getTitle() + "・Login");
        this.authService.isAuthenticated().subscribe(
            (res:any) => {
                if(res) this.route.navigateByUrl("/app/");
            },
            (err:any) => {
                console.log(err);
            }
        );
        
    }
    
}