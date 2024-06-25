// store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from './modal';
import tabReducer from './tab';


const rootReducer = combineReducers({
  modal: modalReducer,
  tab: tabReducer,
});

export default rootReducer;
