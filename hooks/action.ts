// actions.ts
import { ADD_TODO, MARK_AS_COMPLETED, Todo, TodoAction } from './types';

export const addTodo = (todo: Todo): TodoAction => ({
  type: ADD_TODO,
  payload: todo,
});

export const markAsCompleted = (todo: Todo): TodoAction => ({
  type: MARK_AS_COMPLETED,
  payload: todo,
});
