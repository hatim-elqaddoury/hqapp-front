import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { api }  from '../mock/conf';

@Injectable()
export class AdminService {

  private server = api.url;
  private host = this.server+"admin/";  

  constructor(private http: HttpClient, private authS: AuthenticationService) {
  }

  getSetting(key: String) {
    return this.http.get(this.host + "global/getSetting/" + key);
  }

  setSetting(obj: Object){
    return this.http.post(this.host + "global/setSetting/", obj);
  }

  getUsers() {
    return this.http.get(this.host + "users", { headers: { 'HQ-authorise': this.authS.getToken() }} );
  }

  getUser(id: String) {
    return this.http.get(this.host + "user/?id=" + id, { headers: { 'HQ-authorise': this.authS.getToken() } });
  }
  
  updateUser(obj: Object) {
    return this.http.post(this.host + "updateUser/", obj, { headers: { 'HQ-authorise': this.authS.getToken() }});
  }

  updateUserAvatar(obj: Object){
    return this.http.post(this.host + "updateUserAvatar/", obj, { headers: { 'HQ-authorise': this.authS.getToken() } });
  }

  addUser(obj: Object) {
    return this.http.post(this.host + "addUser/", obj, { headers: { 'HQ-authorise': this.authS.getToken() }});
  }

}