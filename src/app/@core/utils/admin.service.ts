import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ResponseContentType} from "@angular/http";

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) {
  }

  private server = "http://192.168.1.29:8080/";
  private host = this.server+"admin/";

  getUsers() {
    //  let token = sessionStorage.getItem("user");
      return this.http.get(this.host + "users");
  }

  getUser(id: String) {
    //  let token = sessionStorage.getItem("user");
      return this.http.get(this.host + "user/?id="+id);
  }

  getSetting(key: String) {
    //  let token = sessionStorage.getItem("user");
    return this.http.get(this.host + "secret/getSetting/"+key);
  }

  setSetting(obj: Object){
    return this.http.post(this.host + "secret/setSetting/", obj);
  }

  addCollab(obj: Object) {
    return this.http.post(this.host + "secret/addUser/", obj);
  }

}