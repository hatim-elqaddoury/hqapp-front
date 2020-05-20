import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../@core/utils';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../../../@core/utils/authentication.service';

@Component({
  selector: 'hq-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  activeUsers:any=[];
  subActiveUsers:any;
  getActiveUsersInterval:any;

  constructor(private authS: AuthenticationService, private router: Router) {
    this.getActiveUser();
  }

  ngOnInit() {
  //  this.getActiveUsersInterval = setInterval(() => { this.getActiveUser(); }, 7000);

  }

  private getActiveUser(){
    this.subActiveUsers = this.authS.getActiveUsers().subscribe(
    res => {
      this.activeUsers = res;
    }, () => {
      clearInterval(this.getActiveUsersInterval);
    });
  }

  ngOnDestroy(){
    clearInterval(this.getActiveUsersInterval);
    this.subActiveUsers.unsubscribe();
  }


}
