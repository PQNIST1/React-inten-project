// features/formSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk để gửi dữ liệu form lên server
export const addFood = createAsyncThunk('auth/addFood', async (formData, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post('http://localhost:8080/api/v1/food', formData, {
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
      const response = await axios.delete(`http://localhost:8080/api/v1/food/${id}`, {
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


export const addCategory = createAsyncThunk('auth/addCategory', async (formData, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post('http://localhost:8080/api/v1/genre', formData, {
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

export const deleteCategory = createAsyncThunk('auth/deleteCategory', async (id, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
      return rejectWithValue('No access token found');
  }
  try {
      const response = await axios.delete(`http://localhost:8080/api/v1/genre/${id}`, {
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

export const addActor = createAsyncThunk('auth/addActor', async (formData, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post('http://localhost:8080/api/v1/cast', formData, {
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

export const deleteActor = createAsyncThunk('auth/deleteActor', async (id, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
      return rejectWithValue('No access token found');
  }
  try {
      const response = await axios.delete(`http://localhost:8080/api/v1/cast/${id}`, {
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
    success: false
  },
  reducers: {
    setName: (state, action) => { state.name = action.payload },
    setPrice: (state, action) => { state.price = action.payload },
    setImage: (state, action) => { state.image = action.payload },
    clearForm: (state) => {state.name = ''; state.price = ''; state.image = null; }
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
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addActor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addActor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addActor.rejected, (state, action) => {
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
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteActor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteActor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteActor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setName, setPrice, setImage, clearForm } = addFoodSlice.actions;

export default addFoodSlice.reducer;
