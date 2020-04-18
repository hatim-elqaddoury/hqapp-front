import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService, AdminService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'hq-public-header',
  styleUrls: ['./public-header.component.scss'],
  templateUrl: './public-header.component.html',
})
export class PublicHeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  usertitle:any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
  ];


  auths = [
    { title: 'Login', icon: 'lock-outline', link: '/auth/login/' },
  ];

  currentTheme = 'dark';
  dbTheme: any;


  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private adminS: AdminService, 
              private router: Router) {
  }

  ngOnInit() {

    this.adminS.getSetting("theme").subscribe(res => {
      this.dbTheme = res;
      this.currentTheme = this.dbTheme.value;
      if (this.currentTheme == 'dark') {
        this.changeTheme('dark');
      } else if (this.currentTheme == 'default') {
        this.changeTheme('default');
      }
    });

    //this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.hatim);


      this.userService.getContacts()
          .pipe(takeUntil(this.destroy$))
          .subscribe((c: any) => this.usertitle = c.type);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick().subscribe((event) => {
    });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    this.currentTheme = themeName;
    this.dbTheme.value = this.currentTheme;
    this.adminS.setSetting(this.dbTheme).subscribe();
    
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  GoTo(url: string): any {
    this.router.navigateByUrl(url);
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
