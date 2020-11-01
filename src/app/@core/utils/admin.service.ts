import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { CryptoService } from './crypto.service';
import { api }  from '../mock/conf';


@Injectable()
export class AdminService {

  private server = api.url;
  private host = this.server+"admin/";  

  constructor(private http: HttpClient, private authS: AuthenticationService, private cryptoS: CryptoService) {
  }

  getSetting(key: String) {
    return this.http.get(this.host + "global/getSetting/" + key);
  }

  setSetting(obj: Object){
    return this.http.post(this.host + "global/setSetting/", obj);
  }

  getUsers() {
    return (this.authS.getToken()) ?this.http.get(this.host + "users", { headers: { 'HQ-authorise': this.authS.getToken() }}) :null;
  }

  getUser(id: String) {
    return this.http.get(this.host + "user/?id=" + id, { headers: { 'HQ-authorise': this.authS.getToken() } });
  }
  verifyEmail(id: String) {
    return this.http.get(this.host + "verifyEmail/?id=" + id, { headers: { 'HQ-authorise': this.authS.getToken() } });
  }
  
  updateUser(obj: Object) {
    return (this.authS.getToken()) ? this.http.post(this.host + "updateUser/", this.cryptoS.encrypt(obj), { headers: { 'HQ-authorise': this.authS.getToken() }}) :null;
  }

  updateUserAvatar(obj: Object){
    return (this.authS.getToken()) ?this.http.post(this.host + "updateUserAvatar/", this.cryptoS.encrypt(obj), { headers: { 'HQ-authorise': this.authS.getToken() }}) :null;
  }

  addUser(obj: Object) {
    return (this.authS.getToken()) ?this.http.post(this.host + "addUser/", obj, { headers: { 'HQ-authorise': this.authS.getToken() }}) :null;
  }

}