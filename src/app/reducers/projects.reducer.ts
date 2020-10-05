import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action } from '@ngrx/store';

export interface ProjectEntity {
  id: string;
  name: string;
}

export interface ProjectState extends EntityState<ProjectEntity> {

}

export const adapter = createEntityAdapter<ProjectEntity>();

// const initialState = adapter.getInitialState();
const initialState: ProjectState = {
  ids: ['1', '2', '3'],
  entities: {
    1: { id: '1', name: 'Work' },
    2: { id: '2', name: 'Home' },
    3: { id: '3', name: 'Fitness' }
  }
};

const reducerFunction = createReducer(
  initialState
);

export function reducer(state: ProjectState = initialState, action: Action): ProjectState {
  return reducerFunction(state, action);
}



