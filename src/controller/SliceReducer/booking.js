import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getReturn = createAsyncThunk('auth/getReturn', async (id, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.patch(`http://localhost:8080/api/v1/bookings/${id}`, null, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});



const initialState = {
  selectedDate: '',
  showtimes: [],
  singlePrice: '',
  doublePrice: '',
  vipPrice: '',
  selectedTime: '',
  selectedSingleSeats: [],
  selectedDoubleSeats: [],
  selectedVipSeats: [],
  selectedMovieId: '',
  selectedMovieName: '',
  selectedMovieImg: '',
  selectedFood: [],
  loading: false,
  error: null,
  success: false,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setError: (state) => {
      state.error = null;
    },
    setSingle: (state, action) => {
      state.singlePrice = action.payload;
    },
    setDouble: (state, action) => {
      state.doublePrice = action.payload;
    },
    setVip: (state, action) => {
      state.vipPrice = action.payload;
    },
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
      const { foodId, id, quantity, price, image } = action.payload;
      const existingFood = state.selectedFood.find(item => item.foodId === foodId);
      if (existingFood) {
        existingFood.quantity += quantity;
      } else {
        state.selectedFood.push({ foodId, id, quantity, price, image });
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
    clearBooking: (state) => {
      state.selectedDate = '';
      state.showtimes = [];
      state.selectedTime = '';
      state.selectedSingleSeats = [];
      state.selectedDoubleSeats = [];
      state.selectedVipSeats = [];
      state.selectedMovieId = '';
      state.selectedMovieName = '';
      state.selectedMovieImg = '';
      state.selectedFood = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReturn.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getReturn.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const paymentUrl = action.payload.data.paymentURL; // Đảm bảo tên trường đúng
        window.location.href = paymentUrl;
      })
      .addCase(getReturn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setDouble, setSingle, setVip,
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
  clearBooking,
  setError,
} = movieSlice.actions;

export default movieSlice.reducer;
