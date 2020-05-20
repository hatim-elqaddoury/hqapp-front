import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbPopoverModule,
  NbCardModule,
  NbTabsetModule,
  NbListModule,
  NbAccordionModule,
  NbTooltipModule,
  NbInputModule,
  NbPlatformModule,
  NbDialogModule,
  NbBadgeModule,
  NbChatModule,
} from '@nebular/theme';
import { NbSecurityModule } from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  TinyMCEComponent,
  PublicHeaderComponent,
  PublicFooterComponent,
  ChatComponent,
  AboutComponent,
  PrivacyComponent,
  TermsComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  SearchPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  PublicOneColumnLayoutComponent,
} from './layouts';
import { WindowModeBlockScrollService } from './services/window-mode-block-scroll.service';
import { DEFAULT_THEME } from './styles/theme.default';
import { DARK_THEME } from './styles/theme.dark';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OnlineUsersComponent } from './components/online-users/online-users.component';

const ANG_MODULES = [
  FormsModule,
  Ng2SearchPipeModule,
];
const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbPopoverModule,
  NbCardModule,
  NbTabsetModule,
  NbListModule,
  NbAccordionModule,
  NbEvaIconsModule,
  NbTooltipModule,
  NbBadgeModule,
  NbInputModule,
  NbPlatformModule,
  NbChatModule,
  NbDialogModule.forChild(),
];
const COMPONENTS = [
  HeaderComponent,
  PublicHeaderComponent,
  FooterComponent,
  PublicFooterComponent,
  ChatComponent,
  AboutComponent,
  PrivacyComponent,
  TermsComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  PublicOneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent, 
  OnlineUsersComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe, 
  SearchPipe
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES, ...ANG_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'dark',
          },
          [ DEFAULT_THEME, DARK_THEME ],
        ).providers,
        WindowModeBlockScrollService,
      ],
    };
  }
}
