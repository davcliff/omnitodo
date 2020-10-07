import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthIsLoggedIn } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loggedIn: boolean;
  constructor(
    store: Store<AppState>,
    private router: Router
  ) {
    store.pipe(
      select(selectAuthIsLoggedIn)
    ).subscribe(auth => this.loggedIn = auth);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.loggedIn) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
