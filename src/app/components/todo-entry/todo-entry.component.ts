import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { todoAdded } from 'src/app/actions/todo-actions';
import { ProjectListModel } from '../../models';
import { AppState, selectProjectListModel } from '../../reducers';

@Component({
  selector: 'app-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.scss']
})
export class TodoEntryComponent implements OnInit {

  form: FormGroup;
  projects$: Observable<ProjectListModel[]>;
  constructor(
    private bottomSheetRef: MatBottomSheetRef<TodoEntryComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      project: [],
      dueDate: []
    });

    this.projects$ = this.store.pipe(
      select(selectProjectListModel)
    );
  }

  get name(): AbstractControl { return this.form.get('name'); }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }

  submit(): void {
    // validate the data
    // tslint:disable-next-line: no-console
    console.log(this.form.value);
    this.store.dispatch(todoAdded({ ...this.form.value }));
    this.bottomSheetRef.dismiss();
  }

}
