// reducer.ts
import { ADD_TODO, MARK_AS_COMPLETED, Todo, TodoAction } from './types';

const initialState = {
  todos: [], // Initial state for todos, adjust as per your application
};

const todoReducer = (state = initialState, action: TodoAction) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload], // Add new todo to todos array
      };
    case MARK_AS_COMPLETED:
        const todoToMove = state.todos.find(todo => todo.id === action.payload);
        if (todoToMove) {
          const updatedTodos = state.todos.filter(todo => todo.id !== action.payload);
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
