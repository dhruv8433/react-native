import { createStore, applyMiddleware } from 'redux';
import persistedReducer from './persistConfig';

const store = createStore(persistedReducer);

export default store;
