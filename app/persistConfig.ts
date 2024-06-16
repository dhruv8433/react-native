import todoReducer from '@/hooks/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
  todos: todoReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['todos'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
