import { Component, OnDestroy, OnInit, ViewChild, TemplateRef, ViewChildren, QueryList, DoCheck } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbPopoverDirective, NbDialogService, NbPopoverComponent } from '@nebular/theme';

import { LayoutService, AdminService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../@core/utils/authentication.service';
import { CryptoService } from '../../../@core/utils/crypto.service';

@Component({
  selector: 'hq-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  private userPictureOnly: boolean = false;
  private user: any;
  private usertitle: any;
  private currentUser: any = "anonymous";
  private activeUserCount: number;
  private currentTheme :any;
  private dbTheme: any;
  private users: any = [];
  private notifsCounter: number;
  private messagesCounter: number=0;
  private searchValue: any;
  private subUsers: any;
  private subMenuService: any;
  private subCurrentUser: any;
  private getConnectedInterval: any;
  private getUsersInterval: any;
  private urlimagetest: any = "https://dyl80ryjxr1ke.cloudfront.net/external_assets/hero_examples/hair_beach_v1785392215/original.jpeg"; //test notif

  // par utilisateurs connecté, 10 max.
  recentSearches = [{}];

  userMenu = [
    { title: 'Profile', icon: 'person-outline', link: '/app/profile/' }, 
    { title: 'Light mode', icon: 'moon-outline', link:'' }, 
    { title: 'Log out', icon: 'power-outline', link: ''}
  ];

  @ViewChild('LostUserRef', { static: true }) LostUserRef: TemplateRef<any>;

  //@ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private adminS: AdminService,
              private router: Router,
              private cryptoS: CryptoService,
              private dialogService: NbDialogService,
              private authS: AuthenticationService) {
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
    }, 3000);

    this.getUsersInterval = setInterval(() => {
      this.getUsers();
    }, 30000);
    
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((v: boolean) => {
        if (v) this.subMenuService = this.menuService.onItemClick().subscribe((e) => { this.sidebarService.toggle(false, 'menu-sidebar') });
        this.userPictureOnly = v; 
      });

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);


    this.subMenuService = this.menuService.onItemClick().subscribe((event) => {
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
        this.authS.logout("/");
      }
    });

  }

  getConnected() {
    this.subCurrentUser = this.authS.getConnected().subscribe((r: any) => {

      let res = this.cryptoS.decrypt(r["encrypted"]);

      if (res && this.currentUser != res["user"]) this.currentUser = JSON.parse(res["user"]);
      else this.currentUser = null;
      
      if (res && res.activeUsers) this.activeUserCount = JSON.parse(res.activeUsers);

      if (this.currentUser) {
        this.currentTheme = this.dbTheme = this.currentUser.theme;
        //  a revoir la date
        //this.currentUser.lastCnx = new Date(this.currentUser.lastCnx);
        //this.currentUser.joinedDate = new Date(this.currentUser.joinedDate);
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
        clearInterval(this.getUsersInterval);
        this.authS.logout("/");
      }
      
    }, ()=>{
      this.authS.logout("/");
      this.showError();
    });
  }

  getUsers(){
    this.subUsers = this.adminS.getUsers().subscribe(res => {
      this.users = this.cryptoS.decrypt(res["encrypted"]);
      if (this.users != (null && undefined)) {
        this.notifsCounter = this.users.slice(0, 10).length;
        this.messagesCounter = (this.users!=null)?this.users.slice(0, 30).length:1;
      }
      
    }, () => {});
  }

  showError(){
    clearInterval(this.getConnectedInterval);
    clearInterval(this.getUsersInterval);
    this.dialogService.open(
      this.LostUserRef,
      {
        hasBackdrop: true,
        closeOnBackdropClick: false,
        closeOnEsc: false,
        autoFocus: false,
      });
  }

  hidePopups() {
    if (this.popovers) {
      this.popovers.forEach( (pop:NbPopoverDirective) => {
        pop.hide();
      });
    }
  }

  public GoTo(url: string): any {
    this.router.navigateByUrl("/app/" + url);
    this.subUsers.unsubscribe();
    this.searchValue = null; 
    event.stopPropagation();
    this.hidePopups();
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
      this.authS.logout(m.link);
    }
    event.stopPropagation();
    this.hidePopups();
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
    clearInterval(this.getUsersInterval);
    this.subMenuService.unsubscribe();
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
