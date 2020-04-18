import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { LoginComponent } from './login/login.component';

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
}