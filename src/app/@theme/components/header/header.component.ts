import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbPopoverDirective } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService, AdminService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'hq-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  usertitle: any;

  currentTheme = 'dark';
  dbTheme: any;
  users: any = [];
  notifsCounter: any;
  messagesCounter: any;
  searchValue: any;
  subUsers: any;
  urlimagetest: any = "https://i.picsum.photos/id/339/200/200.jpg";

  // par utilisateurs connecté, 10 max.
  recentSearches = [ ]; 

  userMenu = [
    { title: 'Profile', icon: 'person-outline', link: '/app/profile/'+'curentuseerid' }, 
    { title: 'Light mode', icon: 'moon-outline', link:'' }, 
    { title: 'Log out', icon: 'power-outline', link: '/public/'}
  ];


  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;

  open(): any {
    this.popover.show();
  }

  close(): any {
    this.popover.hide();
  }

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

    this.subUsers =  this.adminS.getUsers().subscribe(res => {
      this.users = res;
      this.notifsCounter = this.users.slice(0, 10).length;
      this.messagesCounter = this.users.slice(0, 30).length;
    });

    this.adminS.getSetting("theme").subscribe(res => {
      this.dbTheme = res;
      this.currentTheme = this.dbTheme.value;
      if (this.currentTheme == 'dark') {
        this.changeTheme('dark');
      } else if (this.currentTheme == 'default') {
        this.changeTheme('default');
      }
    });

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
      
      if (event.item.title === 'Dark mode' || event.item.title === 'Light mode'  ) {
        
        if(this.currentTheme=='dark'){
          this.changeTheme('default');
        } else if (this.currentTheme == 'default'){
          this.changeTheme('dark');
        }

        this.adminS.setSetting(this.dbTheme).subscribe();

      } else if (event.item.title === 'Log out') {
        console.log('logout clicked');
      }else{
        console.log("item not recognised");
      }

    });

  }

  GoTo(url: string): any {
    this.router.navigateByUrl("/app/" + url);
    this.subUsers.unsubscribe(); 
    this.searchValue = null;
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.subUsers.unsubscribe();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    this.currentTheme = themeName;
    this.dbTheme.value = this.currentTheme;
    if (this.currentTheme == 'default') {
      this.userMenu[1].title = 'Dark mode';
      this.userMenu[1].icon = 'moon-outline';
    } else if (this.currentTheme == 'dark') {
      this.userMenu[1].title = 'Light mode';
      this.userMenu[1].icon = 'sun-outline';
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
