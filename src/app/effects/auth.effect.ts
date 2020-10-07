import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as authActions from '../actions/auth.actions';
import * as todoActions from '../actions/todo-actions';
import { environment } from '../../environments/environment';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  private authUrl = environment.authUrl;

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginSucceeded),
      map(() => todoActions.loadTodos())
    )
  );

  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginSucceeded),
      tap(() => this.router.navigate(['dashboard']))
    ), { dispatch: false }
  );

  loginRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginRequested),
      switchMap((auth) => this.client.post<{ access_token: string }>(this.authUrl, auth.payload)
        .pipe(
          map(response => authActions.loginSucceeded({ payload: { username: auth.payload.username, token: response.access_token } })),
          catchError(err => of(authActions.loginFailed({ message: 'Could not log you in' })))
        )
      )
    )
  );

  // LoginRequested => (LoginSucceeded | LoginFailed)

  constructor(
    private actions$: Actions,
    private client: HttpClient,
    private router: Router
  ) { }
}
