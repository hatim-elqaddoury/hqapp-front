import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../@core/utils/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hq-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss']
})
export class OnlineUsersComponent implements OnInit {

  activeUsers:any=[];
  subActiveUsers:any;
  getActiveUsersInterval: any;
  searchValue:any;

  constructor(private authS: AuthenticationService, private router: Router) {
    this.getActiveUser();
  }
  ngOnInit() {
    this.getActiveUsersInterval = setInterval(() => { this.getActiveUser(); }, 7000);
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
