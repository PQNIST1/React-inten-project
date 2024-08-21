// features/formSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {url} from  './img';

// Async thunk để gửi dữ liệu form lên server
export const addFood = createAsyncThunk('auth/addFood', async (formData, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post(`${url}foods`, formData, {
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

export const deleteFood = createAsyncThunk('auth/deleteFood', async (id, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
      return rejectWithValue('No access token found');
  }
  try {
      const response = await axios.delete(`${url}foods/${id}`, {
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

export const editFood = createAsyncThunk('auth/updateFood', async ( { id, data }, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
      return rejectWithValue('No access token found');
  }
  try {
      const response = await axios.put(`${url}foods/${id}`, data, {
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


const addFoodSlice = createSlice({
  name: 'addFood',
  initialState: {
    name: '',
    price: '',
    image: null,
    loading: false,
    error: null,
    success: false,
    id: '',
    isEdit: false,
  },
  reducers: {
    setName: (state, action) => { state.name = action.payload },
    setPrice: (state, action) => { state.price = action.payload },
    setImage: (state, action) => { state.image = action.payload },
    setEdit: (state, action) => { state.isEdit = action.payload },
    setId: (state, action) => { state.id = action.payload },
    setSuccess: (state) => { state.success = false },
    setError : (state) => { state.error = null},
    clearForm: (state) => {state.name = ''; state.price = ''; state.image = null; state.isEdit = false; state.id = ''; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFood.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addFood.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFood.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editFood.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editFood.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setName, setPrice, setImage, clearForm, setEdit, setError, setId, setSuccess } = addFoodSlice.actions;

export default addFoodSlice.reducer;
