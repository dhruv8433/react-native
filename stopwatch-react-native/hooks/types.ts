// types.ts
export const ADD_TODO = 'ADD_TODO';
export const MARK_AS_COMPLETED = ' MARK_AS_COMPLETED';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

export interface Todo {
  id: string;
  text: string;
  description: string;
  tags: string[];
  date: string;
  completed: boolean;
}

export type CompletedTodo = {
  id: string;
  text: string;
  description: string;
  tags: string[];
  date: string;
  completed: boolean;
};

export interface AddTodoAction {
    type: typeof ADD_TODO;
    payload: Todo;
  }
export interface MarkAsCompletedAction {
    type: typeof MARK_AS_COMPLETED;
    payload: string | number;
  }
    
export interface DeleteTodo {
  type: typeof DELETE_TODO;
  payload : Todo;
}

export interface UpdateTodo {
  type: typeof UPDATE_TODO;
  payload : Todo;
}

export type TodoAction = AddTodoAction | MarkAsCompletedAction | DeleteTodo | UpdateTodo;

export type RootState = {
  todos: {
    todos: Todo[];
    completedTodos: CompletedTodo[];
  };
};

interface State {
  todos: Todo[];
  completedTodos: Todo[];
}

const initialState: State = {
  todos: [],
  completedTodos: [],
};
