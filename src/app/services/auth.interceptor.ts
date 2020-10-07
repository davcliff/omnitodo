import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthIsLoggedIn, selectAuthToken } from '../reducers';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isLoggedIn: boolean;
  token: string;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== environment.authUrl) {
      if (this.isLoggedIn) {
        const newHeaders = req.headers.append('Authorization', 'Bearer ' + this.token);
        const authenticatedRequest = req.clone({ headers: newHeaders });
        return next.handle(authenticatedRequest);
      } else {
        return next.handle(req);
      }
    } else {
      return next.handle(req);
    }
  }


  constructor(private store: Store<AppState>) {
    this.store.pipe(
      select(selectAuthIsLoggedIn)
    ).subscribe(loggedIn => this.isLoggedIn = loggedIn);

    this.store.pipe(
      select(selectAuthToken)
    ).subscribe(token => this.token = token);

  }

}
