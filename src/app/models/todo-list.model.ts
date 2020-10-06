export interface TodoListModel {
  id: string;
  name: string;
  project?: string;
  dueDate?: string;
  completed: boolean;
}
