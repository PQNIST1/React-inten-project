// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { checkAccessTokenExpiration } from './SliceReducer/loggin';

const expirationMiddleware = (store) => (next) => (action) => {
    if (action.type !== checkAccessTokenExpiration.type) {
      store.dispatch(checkAccessTokenExpiration());
    }
    return next(action);
  };
  


export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(expirationMiddleware),
});
