// store/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  videoId: '',
  movieOpen: false,
  showTimeOpen: false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setMovieOpen : (state, action) => {
      state.movieOpen = action.payload;
    },
    setShowtimeOpen : (state, action) => {
      state.showTimeOpen = action.payload;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.videoId = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.videoId = '';
    },
  },
});

export const { openModal, closeModal, setMovieOpen, setShowtimeOpen } = modalSlice.actions;
export default modalSlice.reducer;
