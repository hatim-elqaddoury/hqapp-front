import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../@core/utils/authentication.service';
import { Router } from '@angular/router';
import { AdminService } from '../../../@core/utils';
import { CryptoService } from '../../../@core/utils/crypto.service';

@Component({
  selector: 'hq-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss']
})
export class OnlineUsersComponent implements OnInit {

  now = new Date();
  activeUsers:any=[];
  users:any=[];
  subUsers:any;
  subActiveUsers:any;
  getActiveUsersInterval: any;
  searchValue:any;

  constructor(
    private authS: AuthenticationService, 
    private adminS: AdminService, 
    private router: Router,
    private cryptoS: CryptoService,
    ) {
    this.getUsers();
    this.getActiveUser();
    
  }
  ngOnInit() {
    this.getActiveUsersInterval = setInterval(() => { this.getActiveUser(); 
      
      this.activeUsers.filter((au: any) => {
        this.users.find((u: { idUser: String; lastCnx: Date; })=> {
          if (u.idUser == au.idUser) u.lastCnx = au.lastCnx;
        });
      });

    }, 6000);

  }

  getUsers() {
    this.subUsers = this.adminS.getUsers().subscribe(res => {
      this.users = this.cryptoS.decrypt(res["encrypted"]);   
    }, () => { });
  }

  private getActiveUser(){
    this.subActiveUsers = this.authS.getActiveUsers().subscribe(
    res => {
        this.activeUsers = this.cryptoS.decrypt(res["encrypted"]);
        //this.activeUsers= this.users;

    }, () => {
      clearInterval(this.getActiveUsersInterval);
    });
  }


  ngOnDestroy(){
    clearInterval(this.getActiveUsersInterval);
    this.subActiveUsers.unsubscribe();
    this.subUsers.unsubscribe();
  }


}
