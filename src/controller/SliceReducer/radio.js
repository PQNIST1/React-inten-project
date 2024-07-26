// radioSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const radioSlice = createSlice({
  name: 'radio',
  initialState: {
    selectedOption: '',
  },
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});

export const { setSelectedOption } = radioSlice.actions;

export default radioSlice.reducer;
