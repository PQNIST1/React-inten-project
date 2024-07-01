// store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from './SliceReducer/modal';
import tabReducer from './SliceReducer/tab';
import radioReducer from './SliceReducer/radio';


const rootReducer = combineReducers({
  modal: modalReducer,
  tab: tabReducer,
  radio: radioReducer,
});

export default rootReducer;
