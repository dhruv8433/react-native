// todoReducer.js
import { ADD_TODO, DELETE_TODO, MARK_AS_COMPLETED, UPDATE_TODO } from './types';
import { REHYDRATE } from 'redux-persist';

const initialState = {
  todos: [],
  completedTodos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case MARK_AS_COMPLETED:
      const todoId = action.payload;
      const todoToComplete = state.todos.find(todo => todo.id === todoId);

      if (!todoToComplete) {
        console.error('Todo not found for completion:', todoId);
        return state;
      }

      const updatedTodo = { ...todoToComplete, completed: true };

      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== todoId),
        completedTodos: [...state.completedTodos, updatedTodo],
      };

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.payload.id ? action.payload : todo)),
      };
    case REHYDRATE:
      if (action.payload) {
        return {
          ...state,
          ...action.payload.todos, // Assuming your persisted state structure has a 'todos' key
        };
      }
      return state;
    default:
      return state;
  }
};

export default todoReducer;
