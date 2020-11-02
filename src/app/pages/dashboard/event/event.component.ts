import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../@core/utils';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../../../@core/utils/authentication.service';
import { CryptoService } from '../../../@core/utils/crypto.service';

@Component({
  selector: 'hq-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  activeUsers:any=[];
  subActiveUsers:any;
  getActiveUsersInterval:any;

  constructor(
    private authS: AuthenticationService, 
    private router: Router,
    private cryptoS: CryptoService,
    ) {
    this.getActiveUser();
  }

  ngOnInit() {
  //  this.getActiveUsersInterval = setInterval(() => { this.getActiveUser(); }, 7000);

  }

  private getActiveUser(){
    this.subActiveUsers = this.authS.getActiveUsers().subscribe(
    res => {
      this.activeUsers = this.cryptoS.decrypt(res["encrypted"]);
      console.log("active users ", this.activeUsers);
      
    }, () => {
      clearInterval(this.getActiveUsersInterval);
    });
  }

  ngOnDestroy(){
    clearInterval(this.getActiveUsersInterval);
    this.subActiveUsers.unsubscribe();
  }


}
