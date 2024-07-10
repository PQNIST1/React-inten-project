import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Tạo một async thunk để gọi API
export const getMovie = createAsyncThunk('auth/getMovie', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/movie');
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const addMovie = createAsyncThunk('auth/addMovie', async (formData, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post('http://localhost:8080/api/v1/movie', formData, {
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


const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    loading: false,
    success: false,
    name: '',
    releaseDate: '',
    image: null,
    overview:'',
    trailer:'',
    duration:'',
  },
  reducers: {
    setName: (state, action) => { state.name = action.payload },
    setReleaseDate: (state, action) => { state.releaseDate = action.payload },
    setImage: (state, action) => { state.image = action.payload },
    setOverview: (state, action) => { state.overview = action.payload },
    setTrailer: (state, action) => { state.trailer = action.payload },
    setDuration: (state, action) => { state.duration = action.payload },
    clearForm: (state) => {state.name = ''; state.releaseDate = ''; state.image = null; state.overview = ''; state.trailer = ''; state.duration = ''; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovie.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      })
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setName, setReleaseDate, setImage, setOverview, setTrailer, setDuration} = dataSlice.actions;

export default dataSlice.reducer;
