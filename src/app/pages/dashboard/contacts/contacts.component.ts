import { Component, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { Contacts, RecentUsers, UserData } from '../../../@core/data/users';
import {AdminService} from "../../../@core/utils";

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnDestroy {


  users: any;
  subUsers:any;
  time: Date = new Date();

  constructor( private adminS : AdminService) {
    this.subUsers = this.adminS.getUsers().subscribe(res=>{
      this.users = res;
    }, (err: any)=>{
      //console.log(err);
    });
  }

  ngOnDestroy() {
  }


}
