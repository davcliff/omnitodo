import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { todoCompleted } from 'src/app/actions/todo-actions';
import { PerspectiveModel } from 'src/app/models';
import { AppState, selectInboxTodoList, selectProjectTodoList } from 'src/app/reducers';
import { TodoEntity } from 'src/app/reducers/todos.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  perspective$: Observable<PerspectiveModel>;

  constructor(
    private dialogRef: MatDialogRef<ListComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) private data: { perspective: string, id?: string }

  ) { }

  ngOnInit(): void {
    switch (this.data.perspective) {
      case 'Inbox': {
        this.perspective$ = this.store.pipe(
          select(selectInboxTodoList)
        );
        break;
      }
      case 'Project': {
        this.perspective$ = this.store.pipe(
          select(selectProjectTodoList, { id: this.data.id }),

        );
        break;
      }
    }
  }

  markComplete(payload: TodoEntity): void {
    this.store.dispatch(todoCompleted({ payload }));
  }

}
