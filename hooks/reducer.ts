// reducer.ts
import { REHYDRATE } from 'redux-persist';
import { ADD_TODO, DELETE_TODO, MARK_AS_COMPLETED, Todo, TodoAction } from './types';
import { PersistPartial } from 'redux-persist/es/persistReducer';


interface State {
  todos: Todo[];
  completedTodos: Todo[];
}

const initialState: State = {
  todos: [],
  completedTodos: [],
};

const todoReducer = (state: State = initialState, action: TodoAction & PersistPartial): State => {

  console.log('Reducer action:', action);
  console.log('Current state:', state);

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

      case REHYDRATE:
        // Check if payload exists and update state accordingly
        if (action.payload) {
          return {
            ...state,
            ...action.payload.todos, // Assuming your persisted state structure has a 'todos' key
          };
        }
        return state; // Return current state if no valid payload
   
        case MARK_AS_COMPLETED: {
          const todoId = action.payload as string;
          const todoToComplete = state.todos.find(todo => todo.id === todoId);
    
          if (!todoToComplete) {
            console.error('Todo not found for completion:', todoId);
            return state;
          }
    
          const updatedTodo = { ...todoToComplete, completed: true };
    
          return {
            ...state,
            todos: state.todos.map(todo =>
              todo.id !== todoId
            ),
            completedTodos: [...state.completedTodos, updatedTodo],
          };
        }

    default:
      return state;
  }
};

export default todoReducer;
