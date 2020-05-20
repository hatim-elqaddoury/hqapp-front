import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService, AdminService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { AuthenticationService } from '../../../@core/utils/authentication.service';
import { Title } from '@angular/platform-browser';
import { title } from '../../../@core/mock/conf';

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
  isConnected: Boolean; 
  currentUser: any;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private adminS: AdminService, 
              private router: Router, 
              private authService: NbAuthService,
              private authS: AuthenticationService,
              private titleService: Title) {
    this.titleService.setTitle(title.value+"・public");
    this.authService.isAuthenticated().subscribe((result) => {

      if (result) {
        //get theme from backend if authenticated.
        this.authS.getConnected().subscribe((res:any) => {
          
          if(res) this.currentUser = res.user;

          if (this.currentUser) this.currentTheme = this.currentUser.theme;
          if (this.currentTheme == 'dark') {
            this.changeTheme('dark');
          } else if (this.currentTheme == 'default') {
            this.changeTheme('default');
          }
        });
      }else{
        //get theme from backend if not authenticated.
        this.adminS.getSetting("theme").subscribe(res => {
          this.dbTheme = res;
          if(this.dbTheme != (null && undefined)){
            this.currentTheme = this.dbTheme.value;
            if (this.currentTheme == 'dark') {
              this.changeTheme('dark');
            } else if (this.currentTheme == 'default') {
              this.changeTheme('default');
            }else{
              this.changeTheme('dark');
            }
          }
        });
      }
        this.isConnected = result;
    });

  }

  ngOnInit() {

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
    this.titleService.setTitle(title.value);
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    this.currentTheme = themeName;
    if(this.dbTheme) this.dbTheme.value = this.currentTheme;
    let currentUserCopy = this.currentUser;
    if(currentUserCopy) currentUserCopy.theme = this.dbTheme;
    //this.adminS.updateUser(currentUserCopy).subscribe();
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
