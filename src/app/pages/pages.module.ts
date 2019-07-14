import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CvComponent} from './cv/cv.component';
import { NbCardModule, NbLayoutModule, NbListModule, NbMenuModule, NbThemeModule, NbUserModule} from '@nebular/theme';
import { HomeComponent } from './home/home.component';
import { PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    PagesComponent,
    CvComponent,
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    NbThemeModule,
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbUserModule,
    NbMenuModule,
    NbListModule,
    NbLayoutModule,
    PagesRoutingModule,
  ],
  exports: [
  ]
})
export class PagesModule { }
