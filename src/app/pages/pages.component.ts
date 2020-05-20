import { Component, OnInit, OnDestroy } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { AuthenticationService } from '../@core/utils/authentication.service';

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
export class PagesComponent implements OnInit, OnDestroy
{

  menu = MENU_ITEMS;
  subCurrentUser:any;
  subLogout:any;
  currentUser:any;
  getConnectedInterval:any;

  constructor(private authS: AuthenticationService){
    
  }
  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    if ( (this.getConnectedInterval && this.subLogout && this.subCurrentUser) != (null && undefined) ){
      clearInterval(this.getConnectedInterval);
      this.subLogout.unsubscribe();
      this.subCurrentUser.unsubscribe(); 
    }
  }

  getConnected() {
    this.subCurrentUser = this.authS.getConnected().subscribe((res: any) => {
      this.currentUser = res;
    });
  }

  
}
