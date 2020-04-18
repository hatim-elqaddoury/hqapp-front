import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HQAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule
} from '@nebular/theme';
import { LoginComponent } from './login/login.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NbAlertModule,
        NbInputModule,
        NbButtonModule,
        NbCheckboxModule,
        HQAuthRoutingModule,

        NbAuthModule,
    ],
    declarations: [
        // ... here goes our new components
        LoginComponent
    ],
})
export class HQAuthModule {
}