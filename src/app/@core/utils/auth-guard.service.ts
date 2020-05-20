import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { NetworkService } from './network.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: NbAuthService, private network: NetworkService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.check();
    }

    check(){
        if (this.network.online) {

            return this.authService.isAuthenticated();
        }
        this.network.isNetworkStopped = true;
        return false; 
    }


}
