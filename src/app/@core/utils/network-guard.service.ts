import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NetworkService } from './network.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NetworkGuard implements CanActivate {
    constructor(private network: NetworkService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.network.online) {
            return true;
        }
        this.network.isNetworkStopped = true;
        return false;
    }
}

/*
to ses if the serer is connected.
*/