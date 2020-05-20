import { Component, OnDestroy, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbPopoverDirective, NbDialogService } from '@nebular/theme';

import { LayoutService, AdminService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NbAuthService, NbTokenStorage, NbTokenService, NbAuthJWTToken } from '@nebular/auth';
import { AuthenticationService } from '../../../@core/utils/authentication.service';

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
  currentUser: any = "anonymous";
  activeUserCount: number;
  currentTheme :any;
  dbTheme: any;
  users: any = [];
  notifsCounter: number;
  messagesCounter: number;
  searchValue: any;
  subUsers: any;
  subCurrentUser: any;
  getConnectedInterval: any;
  urlimagetest: any = "https://i.picsum.photos/id/339/200/200.jpg"; //test notif

  // par utilisateurs connecté, 10 max.
  recentSearches = [{}]; 

  userMenu = [
    { title: 'Profile', icon: 'person-outline', link: '/app/profile/' }, 
    { title: 'Light mode', icon: 'moon-outline', link:'' }, 
    { title: 'Log out', icon: 'power-outline', link: ''}
  ];

  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;

  @ViewChild('LostUserRef', { static: true }) LostUserRef: TemplateRef<any>;

  @ViewChild('templateSearchRef', { static: true }) templateSearchRef: NbPopoverDirective;



  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private adminS: AdminService,
              private router: Router,
              private dialogService: NbDialogService,
              public authS: AuthenticationService) {
   
    this.getConnected();
    this.getUsers();

  }

  openD(dialog: TemplateRef<any>) {
    this.dialogService.open( 
      dialog,
      {
        hasBackdrop: true, 
        closeOnBackdropClick: true, 
        closeOnEsc: true,
        autoFocus: false,
      }
    );
    //.onClose.subscribe(v => console.log(v));
  }

  ngOnInit() {
   

    this.getConnectedInterval = setInterval(() => { 
      this.getConnected();
      this.getUsers();
    }, 7000);

    
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((v: boolean) => {
        if (v) this.menuService.onItemClick().subscribe((e) => { this.sidebarService.toggle(false, 'menu-sidebar') });
        this.userPictureOnly = v; 
      });

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
        //set theme for the curent user
        let currentUserCopy = this.currentUser;
        if (currentUserCopy) {
          currentUserCopy.theme = this.dbTheme;
          this.adminS.updateUser(currentUserCopy).subscribe();
        }

      } else if (event.item.title == 'Log out') {
        this.authS.logout("/").subscribe();
      }
    });

  }

  getConnected() {
    this.subCurrentUser = this.authS.getConnected().subscribe((res: any) => {
      if (res && this.currentUser != res.user) this.currentUser = res.user;
      else this.currentUser = null;
      if (res && res.activeUsers) this.activeUserCount = res.activeUsers;

      if (this.currentUser) {
        this.currentTheme = this.dbTheme = this.currentUser.theme;
        if (this.currentTheme == 'dark') {
          this.changeTheme('dark');
        } else if (this.currentTheme == 'default') {
          this.changeTheme('default');
        }else{
          this.changeTheme('dark');
        }
        this.userMenu[0].link = '/app/profile/'+this.currentUser.username;
      } else {
        clearInterval(this.getConnectedInterval);
        this.authS.logout("/").subscribe();
      }
    }, (err:any)=>{
      this.showError();
    });
  }

  getUsers(){
    this.subUsers = this.adminS.getUsers().subscribe(res => {
      this.users = res;
      if (this.users != (null && undefined)) {
        this.notifsCounter = this.users.slice(0, 10).length;
        this.messagesCounter = this.users.slice(0, 30).length;
      }
    }, () => {});
  }

  showError(){
    clearInterval(this.getConnectedInterval);
    this.dialogService.open(
      this.LostUserRef,
      {
        hasBackdrop: true,
        closeOnBackdropClick: false,
        closeOnEsc: false,
        autoFocus: false,
      });
  }

  openPopover() {
    console.log(this.popover);
    this.popover.show();
  }

  hidePopover(){
   console.log(this.popover );
    this.popover.hide();
  }

  public GoTo(url: string): any {
    this.router.navigateByUrl("/app/" + url);
    this.subUsers.unsubscribe();
    this.searchValue = null; 
    event.stopPropagation();
    this.hidePopover();
    //this.templateSearchRef.hide();
  }

  public GoToUsrMenu(m: any): any {
    if(m.title.match('Dark mode') || m.title.match('Light mode')){
      if (this.currentTheme == 'dark') this.changeTheme('default');
      else if (this.currentTheme == 'default') this.changeTheme('dark');
      else this.changeTheme('dark');
      let currentUserCopy = this.currentUser;
      currentUserCopy.theme = this.dbTheme;
      this.adminS.updateUser(currentUserCopy).subscribe();
    }else if(m.title.match('Profile')){
      this.GoTo('profile/' + this.currentUser.username);
    } else if (m.title.match('Log out')){
      this.authS.logout(m.link).subscribe();
    }
    event.stopPropagation();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    this.currentTheme = themeName;
    this.dbTheme = this.currentTheme;
    if (this.currentTheme == 'default') {
      this.userMenu[1].title = 'Dark mode';
      this.userMenu[1].icon = 'moon-outline';
    } else if (this.currentTheme == 'dark') {
      this.userMenu[1].title = 'Light mode';
      this.userMenu[1].icon = 'sun-outline';
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(false, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }
  
  toggleOnlineUsersBar() {
    this.sidebarService.toggle(false, 'onlineUsers');
    this.layoutService.changeLayoutSize();
    return false;
  }

  reload(){
    location.reload();
  }

  ngOnDestroy() {
    clearInterval(this.getConnectedInterval);
    this.subCurrentUser.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
    this.subUsers.unsubscribe();
    //this.sidebarService.expand('menu-sidebar');
  }
  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
