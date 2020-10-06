import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoListModel } from 'src/app/models';
import { AppState, selectInboxTodoList } from 'src/app/reducers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  items$: Observable<TodoListModel[]>;
  perspective: string;
  constructor(
    private dialogRef: MatDialogRef<ListComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) private data: { perspective: string }

  ) { }

  ngOnInit(): void {
    this.perspective = this.data.perspective;
    switch (this.data.perspective) {
      case 'Inbox': {
        this.items$ = this.store.pipe(
          select(selectInboxTodoList)
        );
      }
    }
  }

}
