import { ProjectListModel } from './project-list.model';
import { TodoListModel } from './todo-list.model';

export interface PerspectiveModel {
  perspectiveName: string;
  items: TodoListModel[];
}
