// actions.ts
import { ADD_TODO, DELETE_TODO, MARK_AS_COMPLETED, Todo, TodoAction, UPDATE_TODO } from './types';

export const addTodo = (todo: Todo): TodoAction => ({
  type: ADD_TODO,
  payload: todo,
});

export const markAsCompleted = (id: string): TodoAction => ({
  type: MARK_AS_COMPLETED,
  payload: id,
});

export const deleteTodo = (id: string) => ({
  type: DELETE_TODO,
  payload: id,
});

export const updateTodo = (todo: Todo) => ({
  type: UPDATE_TODO,
  payload: todo,
});