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
import specialReducer from './SliceReducer/specialDay';
import categoryReducer from './SliceReducer/addCategory';
import actorReducer from './SliceReducer/addActor';
import roomReducer from './SliceReducer/addRoom';
import searchReducer from './SliceReducer/search';
import seatsReducer from './SliceReducer/seatsSlice';
import seatsEditReducer from './SliceReducer/seatEdit';
import showTimeReducer from './SliceReducer/addShowTime';

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
  special: specialReducer,
  category: categoryReducer,
  actor: actorReducer,
  room: roomReducer,
  seacrh: searchReducer,
  seats: seatsReducer,
  seatsEdit: seatsEditReducer,
  showTime: showTimeReducer,
});

export default rootReducer;
