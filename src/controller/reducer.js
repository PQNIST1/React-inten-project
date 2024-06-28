// store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from './SliceReducer/modal';
import tabReducer from './SliceReducer/tab';


const rootReducer = combineReducers({
  modal: modalReducer,
  tab: tabReducer,
});

export default rootReducer;
