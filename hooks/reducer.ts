// reducer.ts
import { ADD_TODO, MARK_AS_COMPLETED, Todo, TodoAction } from './types';

interface State {
  todos: Todo[];
  completedTodos: Todo[];
}

const initialState: State = {
  todos: [],
  completedTodos: [],
};

const todoReducer = (state: State = initialState, action: TodoAction): State => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case MARK_AS_COMPLETED:
      const todoToMove = state.todos.find(todo => todo.id === action.payload.id);
      if (todoToMove) {
        const updatedTodos = state.todos.filter(todo => todo.id !== action.payload.id);
        return {
          ...state,
          todos: updatedTodos,
          completedTodos: [...state.completedTodos, todoToMove],
        };
      }
      return state;
    default:
      return state;
  }
};

export default todoReducer;
