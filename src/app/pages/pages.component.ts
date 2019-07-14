import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  menu:any;


  MENU_ITEMS: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'nb-home',
      link: '/pages/home',
      home: true,
    },
    {
      title: 'Dashboard',
      icon: 'nb-bar-chart',
      link: '/pages/dashboard',
    },
    {
      title: 'Cv',
      icon: 'nb-compose',
      link: '/pages/cv',
    },
  ];


  constructor() { }

  ngOnInit() {
    this.menu = this.MENU_ITEMS;
  }


}
