import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { environment } from '../../environments/environment';
import * as todoActions from '../actions/todo-actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TodoEntity } from '../reducers/todos.reducer';
import { of } from 'rxjs';

@Injectable()
export class TodoEffects {

  apiUrl = environment.apiUrl;

  // turn a todoAdded -> todoAddedSucchess | todoAddedFail
  saveTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.todoAdded),
      map(action => action.payload),
      switchMap(todo => this.client.post<TodoEntity>(this.apiUrl + 'todos', makeATodoCreate(todo))
        .pipe(
          map(response => todoActions.todoAddedSuccessfully({ oldId: todo.id, payload: response })),
          catchError(err => of(todoActions.todoAddedFailure({ message: 'Blammo!', payload: todo })))
        )
      )
    ), { dispatch: true }
  );
  // turn a loadData -> loadDataSucceeded | loadDatFailed
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.loadTodos),
      switchMap(() => this.client.get<{ data: TodoEntity[] }>(this.apiUrl + 'todos')
        .pipe(
          map(results => todoActions.loadDataSucceeded({ payload: results.data })),
          catchError(results => of(todoActions.loadDataFailure({ message: 'Sorry. No Todos for you!' })))
        )
      )
    )
    , { dispatch: true }
  );

  constructor(
    private actions$: Actions,
    private client: HttpClient
  ) { }
}


interface TodoCreate {
  name: string;
  project?: string;
  dueDate?: string;
  completed: boolean;
}

function makeATodoCreate(todo: TodoEntity): TodoCreate {
  return {
    name: todo.name,
    project: todo.project,
    dueDate: todo.dueDate,
    completed: todo.completed
  };
}
