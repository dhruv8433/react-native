// actions.ts
import { ADD_TODO, MARK_AS_COMPLETED, Todo, TodoAction } from './types';

export const addTodo = (todo: Todo): TodoAction => ({
  type: ADD_TODO,
  payload: todo,
});

export const markAsCompleted = (id: string) => ({
    type: MARK_AS_COMPLETED,
    payload: id,
  });