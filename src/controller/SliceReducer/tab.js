// tabSlice.js
import { createSlice } from '@reduxjs/toolkit';
const tabs = ['seat','food', 'payment', 'comfirm'];
export const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    activeTab: 'profile',
    tabs,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
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

export const { setActiveTab, handleNext, handlePrev } = tabSlice.actions;

export default tabSlice.reducer;
