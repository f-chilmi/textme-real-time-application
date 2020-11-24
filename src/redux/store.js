import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
// import createAsyncStorage from 'redux-persist-react-native-async-storage';
import asyncStorage from '@react-native-async-storage/async-storage'
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: asyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    applyMiddleware(promiseMiddleware, logger),
  );
  const persistor = persistStore(store);
  return {store, persistor};
};