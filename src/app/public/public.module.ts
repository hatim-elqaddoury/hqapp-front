import { NgModule } from '@angular/core';
import { NbMenuModule, NbIconModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
    imports: [
        PublicRoutingModule,
        ThemeModule,
        NbMenuModule,
        MiscellaneousModule,
        NbIconModule,
        NbEvaIconsModule,
    ],
    declarations: [
        PublicComponent,
        HomeComponent,
    ],
})
export class PublicModule {
}
