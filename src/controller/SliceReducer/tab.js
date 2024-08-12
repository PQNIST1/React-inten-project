// tabSlice.js
import { createSlice } from '@reduxjs/toolkit';
const tabs = ['movie','seat','food', 'payment', 'comfirm'];
export const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    activeTab: 'profile',
    activeMovieTab: "tab1",
    tabs: tabs,
    page:1,
  },
  reducers: {
    setPage: (state, action) => {
      state.page =action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setActiveMovieTab: (state, action) => {
      state.activeMovieTab = action.payload;
    },
    handleNext: (state) => {
      const currentIndex = state.tabs.indexOf(state.activeTab);
      if (currentIndex < state.tabs.length - 1) {
        state.activeTab = state.tabs[currentIndex + 1];
      }
    },
    handlePrev: (state) => {
      const currentIndex = state.tabs.indexOf(state.activeTab);
      if (currentIndex > 0) {
        state.activeTab = state.tabs[currentIndex - 1];
      } 
    },
  },

});

export const { setPage, setActiveTab, setActiveMovieTab, handleNext, handlePrev } = tabSlice.actions;

export default tabSlice.reducer;
