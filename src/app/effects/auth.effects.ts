import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as authActions from '../actions/auth.actions';
import * as todoActions from '../actions/todo-actions';
import { environment } from '../../environments/environment';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class AuthEffects {

  private authUrl = environment.authUrl;

  // loginSucceded -> loadTodos
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      // all the actions that left the reducer
      ofType(authActions.loginSucceeded), // filter
      // only keep going if it a loginSucceeded
      map(() => todoActions.loadTodos())
      // turn the input into the output
    ) // [todoActions.loadTodos]
  );

  // if they login successfully, take them to the dashboard.
  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginSucceeded),
      tap(() => this.router.navigate(['dashboard'])),
    ), { dispatch: false }
  );


  // loginRequested => (loginSucceeded | loginFailed)
  loginRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginRequested),
      switchMap((auth) => this.client.post<{ access_token: string }>(this.authUrl, auth.payload)
        .pipe(
          map(response => authActions.loginSucceeded({ payload: { username: auth.payload.username, token: response.access_token } })),
          catchError(err => of(authActions.loginFailed({ message: 'Could not Log You in' })))
        )
      )
    ), { dispatch: true }
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private client: HttpClient
  ) { }
}
