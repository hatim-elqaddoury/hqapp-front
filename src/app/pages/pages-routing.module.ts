import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {CvComponent} from './cv/cv.component';
import {PagesComponent} from './pages.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'cv',
      component: CvComponent,
    },
    {
      path: '**',
      component: HomeComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
