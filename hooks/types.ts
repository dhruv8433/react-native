// types.ts
export const ADD_TODO = 'ADD_TODO';
export const MARK_AS_COMPLETED = ' MARK_AS_COMPLETED';

export type Todo = {
  id: string;
  text: string;
  description: string;
  tags: string[];
  date: string;
  completed: boolean; // Assuming you have a completed flag in your Todo type
};
export interface AddTodoAction {
    type: typeof ADD_TODO;
    payload: Todo;
  }

export interface MarkAsCompletedAction {
    type: typeof MARK_AS_COMPLETED;
    payload: Todo; // Assuming payload is the ID of the todo to mark as completed
  }
  
  export type TodoAction = AddTodoAction | MarkAsCompletedAction;

export type RootState = {
  todos: {
    todos: Todo[]; // Assuming this is how your todos are structured in Redux state
    completedTodos: Todo[]; // Assuming this is how your completed todos are structured in Redux state
  };
};
