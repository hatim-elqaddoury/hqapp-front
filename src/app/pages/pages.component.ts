import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'hq-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <hq-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </hq-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
