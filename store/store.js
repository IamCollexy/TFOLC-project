import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { request } from './slices/requestSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import isAuthReducer from './slices/isAuthSlice';
import deliveryReducer from './slices/deliverySlice';

const reducers = combineReducers({
  user: userReducer,
  isAuth: isAuthReducer,
  delivery: deliveryReducer,
  [request.reducerPath]: request.reducer,
});
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['delivery', 'user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(request.middleware),
});
export const persistor = persistStore(store);
setupListeners(store.dispatch);

export default store;
