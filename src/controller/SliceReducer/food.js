import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Tạo một async thunk để gọi API
export const getFood = createAsyncThunk('auth/getFood', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/food');
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getCategory = createAsyncThunk('auth/getCategory', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/genre');
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getActor = createAsyncThunk('auth/getActor', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/cast');
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getRoom = createAsyncThunk('auth/getRoom', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/room');
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});


const foodSlice = createSlice({
  name: 'food',
  initialState: {
    data: [],
    data1:[],
    data2:[],
    data3:[],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFood.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getFood.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getFood.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      })
      .addCase(getCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data1 = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      })
      .addCase(getActor.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getActor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data2 = action.payload;
      })
      .addCase(getActor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      }) 
      .addCase(getRoom.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data3 = action.payload;
      })
      .addCase(getRoom.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      });
  },
});

export default foodSlice.reducer;
