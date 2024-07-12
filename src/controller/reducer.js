// store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from './SliceReducer/modal';
import tabReducer from './SliceReducer/tab';
import radioReducer from './SliceReducer/radio';
import movieReducer from './SliceReducer/booking'
import paymentReducer from './SliceReducer/payment';
import logginReducer from './SliceReducer/loggin';
import userReducer from './SliceReducer/getUser';
import dataReducer from './SliceReducer/moive';
import foodReducer from './SliceReducer/food';
import addFoodReducer from './SliceReducer/addFood';
import seatReducer from './SliceReducer/seat';

const rootReducer = combineReducers({
  modal: modalReducer,
  tab: tabReducer,
  radio: radioReducer,
  movie: movieReducer,
  payment: paymentReducer,
  loggin: logginReducer,
  user: userReducer,
  data: dataReducer,
  food: foodReducer,
  addFood: addFoodReducer,
  seat: seatReducer,
});

export default rootReducer;
