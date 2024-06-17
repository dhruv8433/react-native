import { createStore, applyMiddleware } from 'redux';
import persistedReducer from './persistConfig';
import { persistStore } from 'redux-persist';

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export default store;


export const clearStorage = () => {
    persistor.purge().then(() => {
        console.log('Purged persisted state');
    });
};