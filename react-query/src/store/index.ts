import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist'
import createRootReducer from './ducks/rootReducer';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const __prod__ = process.env.NODE_ENV === 'production';
export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));
const store = configureStore({
  reducer: persistedReducer,
  devTools: !__prod__,
  middleware: [],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

export default store;
