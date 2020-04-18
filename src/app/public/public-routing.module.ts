import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    // .. here goes our components routes
    {
        path: '',
        component: PublicComponent,  // <---
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'miscellaneous',
                loadChildren: () => import('./miscellaneous/miscellaneous.module')
                    .then(m => m.MiscellaneousModule),
            },
            {
                path: '',
                redirectTo: '',
                pathMatch: 'full',
            },
            {
                path: '**',
                redirectTo: '',
                component: HomeComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PublicRoutingModule {
}