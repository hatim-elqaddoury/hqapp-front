import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../@core/utils';

@Component({
  selector: 'hq-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  users:any=[];
  subUsers:any;
  constructor(private adminS: AdminService) {
  }

  ngOnInit() {
    this.subUsers = this.adminS.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  ngOnDestroy(){
    this.subUsers.unsubscribe();
  }


}
