import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/todo-actions';
export interface TodoEntity {
  id: string;
  name: string;
  project?: string;
  dueDate?: string;
  completed: boolean;
}

export interface TodoState extends EntityState<TodoEntity> {

}

export const adapter = createEntityAdapter<TodoEntity>();


// const initialState = adapter.getInitialState();
const initialState: TodoState = {
  ids: ['1', '2', '3', '4'],
  entities: {
    1: { id: '1', name: 'Clean Garage', completed: false },
    2: { id: '2', name: 'Rake Leaves', dueDate: '2020-10-15T19:00:26.608Z', completed: false },
    3: { id: '3', name: 'Paint Hallway', project: '2', completed: false },
    4: { id: '4', name: 'Go to Grocery', completed: true }
  }
};

const reducerFunction = createReducer(
  initialState,
  on(actions.todoAdded, (oldState, action) => adapter.addOne(action.payload, oldState))
);

export function reducer(state: TodoState = initialState, action: Action): TodoState {
  return reducerFunction(state, action);
}



