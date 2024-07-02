// store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from './SliceReducer/modal';
import tabReducer from './SliceReducer/tab';
import radioReducer from './SliceReducer/radio';
import movieReducer from './SliceReducer/booking'
import paymentReducer from './SliceReducer/payment';

const rootReducer = combineReducers({
  modal: modalReducer,
  tab: tabReducer,
  radio: radioReducer,
  movie: movieReducer,
  payment: paymentReducer,
});

export default rootReducer;
