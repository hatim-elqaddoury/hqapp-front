import { Injectable } from '@angular/core';
import { NbTokenStorage, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { api } from '../mock/conf';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private server = api.url;
  private host = this.server + "auth/";
  private bearer: string = "HQ ";

  constructor(private http: HttpClient, private provide: NbTokenStorage, private authService: NbAuthService, private router: Router, private network: NetworkService)  { }


  // refresh to get the current token
  public getToken(): any {
    let token: any = null;
      if (this.network.online) {
        this.authService.isAuthenticated().subscribe(authenticated => {
          if (authenticated)
            this.authService.getToken().subscribe(
              res => {
                token = this.bearer + res.getValue();
              },
              err => {
                console.log(err);
              }
            );
        });
      }else{
        console.error("connection lost");
        this.network.isNetworkStopped = true;
      }
      return token;
  }


  public getActiveUsers() {
    return (this.getToken())? this.http.get(this.host + "getActiveUsers", { headers: { 'HQ-authorise': this.getToken() } }) :null;
  }

  public logout(url: string) {
    let res: any = (this.getToken()) ? this.http.post(this.host + "logout/?authorisationHeader=" + this.getToken(), {headers: {'HQ-authorise': this.getToken()}}).subscribe() : null;
    //let res: any = this.http.post(this.host + "logout/?authorisationHeader=" + this.getToken(), { headers: { 'HQ-authorise': this.getToken() } }).subscribe();
    this.provide.clear();
    this.router.navigateByUrl(url); 
    return res;
  }

  public getConnected() {
    return (this.getToken()) ?this.http.get(this.host + "connected/?authorisationHeader=" + this.getToken(), { headers: { 'HQ-authorise': this.getToken() } }) :null;
  }

  public loginGoogle(obj:any){
    return this.http.post(this.host + "singInGoogle/", obj)
    
  }

}
