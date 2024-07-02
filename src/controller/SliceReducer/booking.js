import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDate: '',
  showtimes: {},
  selectedTime: '',
  selectedSingleSeats: [],
  selectedDoubleSeats: [],
  selectedVipSeats: [],
  selectedMovieId: '',
  selectedMovieName: '',
  selectedMovieImg: '',
  selectedFood: [],
};

const movieSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action) => {
      state.selectedTime = action.payload;
    },
    setShowtimes: (state, action) => {
        state.showtimes = action.payload;
    },
    setSelectedSingleSeats: (state, action) => {
      state.selectedSingleSeats = action.payload;
    },
    setSelectedDoubleSeats: (state, action) => {
      state.selectedDoubleSeats = action.payload;
    },
    setSelectedVipSeats: (state, action) => {
      state.selectedVipSeats = action.payload;
    },
    setSelectedMovieId: (state, action) => {
      state.selectedMovieId = action.payload;
    },
    setSelectedMovieName: (state, action) => {
      state.selectedMovieName = action.payload;
    },
    setSelectedMovieImg: (state, action) => {
      state.selectedMovieImg = action.payload;
    },
    setSelectedFood: (state, action) => {
      state.selectedFood = action.payload;
    },
    addFood: (state, action) => {
      const { foodId, quantity } = action.payload;
      const existingFood = state.selectedFood.find(item => item.foodId === foodId);
      if (existingFood) {
        existingFood.quantity += quantity;
      } else {
        state.selectedFood.push({ foodId, quantity });
      }
    },
    removeFood: (state, action) => {
      const { foodId, quantity } = action.payload;
      const existingFood = state.selectedFood.find(item => item.foodId === foodId);
      if (existingFood) {
        if (existingFood.quantity > quantity) {
          existingFood.quantity -= quantity;
        } else {
          state.selectedFood = state.selectedFood.filter(item => item.foodId !== foodId);
        }
      }
    },
  },
});

export const {
  setSelectedDate,
  setSelectedTime,
  setShowtimes,
  setSelectedSingleSeats,
  setSelectedDoubleSeats,
  setSelectedVipSeats,
  setSelectedMovieId,
  setSelectedMovieName,
  setSelectedMovieImg,
  setSelectedFood,
  addFood,
  removeFood,
} = movieSlice.actions;

export default movieSlice.reducer;
