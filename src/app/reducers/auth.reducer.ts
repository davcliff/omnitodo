import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/auth.actions';
export interface AuthState {
  isLoggedIn: boolean;
  username: string;
  token: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  username: null,
  token: null
};


const reducerFunction = createReducer(
  initialState,
  on(actions.loginRequested, actions.loginFailed, () => initialState),
  on(actions.loginSucceeded, (s, a) => ({
    isLoggedIn: true,
    username: a.payload.username,
    token: a.payload.token
  }))
);


export function reducer(state: AuthState, action: Action): AuthState {
  return reducerFunction(state, action);
}
