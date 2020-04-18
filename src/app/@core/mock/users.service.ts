import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Contacts, RecentUsers, UserData } from '../data/users';

@Injectable()
export class UserService extends UserData {

  private time: Date = new Date;

  private users = {
    hatim: { name: 'Hatim El-Qaddoury', picture: '' },
  };
  private types = {
    admin: 'admin',
  };
  private contacts: Contacts[] = [
    { user: this.users.hatim, type: this.types.admin },
  ];
  private recentUsers: RecentUsers[]  = [
    { user: this.users.hatim, type: this.types.admin, time: this.time.setHours(21, 12)},
  ];

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getContacts(): Observable<Contacts[]> {
    return observableOf(this.contacts);
  }

  getRecentUsers(): Observable<RecentUsers[]> {
    return observableOf(this.recentUsers);
  }
}
