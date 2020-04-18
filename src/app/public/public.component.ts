import { Component } from '@angular/core';

import { MENU_ITEMS } from './public-menu';

@Component({
  selector: 'hq-public',
  styleUrls: ['public.component.scss'],
  template: `
    <hq-public-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </hq-public-one-column-layout>
  `,
})
export class PublicComponent {

  menu = MENU_ITEMS;
}
