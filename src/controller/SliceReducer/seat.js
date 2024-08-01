import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';






export const getSeatType = createAsyncThunk('auth/getSeatType', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/seat-types');
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});


export const addSeatType = createAsyncThunk('auth/addSeatType', async (data,{ rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post('http://localhost:8080/api/v1/seat-types', data, {
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

export const deleteSeatType = createAsyncThunk('auth/deleteSeatType', async (id, { dispatch, rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.delete(`http://localhost:8080/api/v1/seat-types/${id}`, {
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

export const deleteSeatTypePrice = createAsyncThunk('auth/deleteSeatTypePrice', async (id, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.delete(`http://localhost:8080/api/v1/seat-prices/${id}`, {
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

export const addSeatTypePrice = createAsyncThunk('auth/addSeatTypePrice', async (formData, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post('http://localhost:8080/api/v1/seat-prices', formData, {
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

export const getSeatTypePrice = createAsyncThunk('auth/getSeatTypePrice', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/seat-prices');
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});



export const editSeatType = createAsyncThunk('auth/updateSeatType', async ({ type_id, id, data, data1 }, { dispatch, rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.put(`http://localhost:8080/api/v1/seat-types/${type_id}`, data, {
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

export const editSeatTypePrice = createAsyncThunk('auth/updateSeatTypePrice', async ({ id, data}, { rejectWithValue }) => {
 
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.put(`http://localhost:8080/api/v1/seat-prices/${id}`, data, {
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
  data: [],
  seat_price: [],
  dateStart: null,
  dateEnd: null,
  name: '',
  code: '',
  price: '',
  normalDay: false,
  weekend: false,
  specialDay: false,
  earlyShow: false,
  loading: false,
  type_id: null,
  id: '',
  error: null,
  success: false,
  status: 'idle',
  isEdit: false,
  isEditPrice: false,
  isAddPrice: false,
};

const seatSlice = createSlice({
  name: 'seat',
  initialState,
  reducers: {
    setDateStart: (state, action) => {
      state.dateStart = action.payload;
    },
    
    setDateEnd: (state, action) => {
      state.dateEnd = action.payload;
    },
    setSuccess: (state) => { state.success = false },
    setError: (state) => { state.error = null },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setType_id: (state, action) => {
      state.type_id = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setNormal : (state, action) => {
      state.normalDay = action.payload;
    },
    setWeekend : (state, action) => {
      state.weekend = action.payload;
    },
    setSpecial : (state, action) => {
      state.specialDay = action.payload;
    },
    setEarly : (state, action) => {
      state.earlyShow = action.payload;
    },
    setDay: (state, action) => {
      state.normalDay = false;
      state.weekend = false;
      state.specialDay = false;
      state.earlyShow = false;
      state[action.payload] = true;
    },
    setEdit: (state, action) => {
      state.isEdit = action.payload;
      state.isAddPrice = false;
      state.isEditPrice = false;
    },
    setEditPrice: (state, action) => {
      state.isEditPrice = action.payload;
      state.isAddPrice = false;
      state.isEdit = false;
    },
    setIsAddPrice: (state, action) => {
      state.isAddPrice = action.payload;
      state.isEditPrice = false;
      state.isEdit = false;
    },
    clearForm: (state) => {
      state.isAddPrice = false; state.isEditPrice = false; state.name = ''; state.code = ''; state.dateStart = null; state.dateEnd = null; state.normalDay = false; state.weekend = false; state.specialDay = false; state.earlyShow = false; state.price = ''; state.type_id = null; state.isEdit = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSeatType.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getSeatType.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getSeatType.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      })
      .addCase(addSeatType.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addSeatType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addSeatType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSeatType.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteSeatType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteSeatType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSeatTypePrice.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addSeatTypePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addSeatTypePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSeatTypePrice.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getSeatTypePrice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.seat_price = action.payload;
      })
      .addCase(getSeatTypePrice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      })
      .addCase(editSeatType.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editSeatType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editSeatType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editSeatTypePrice.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editSeatTypePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(editSeatTypePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSeatTypePrice.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteSeatTypePrice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteSeatTypePrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setIsAddPrice, setEditPrice, setName, setCode, setPrice, setDateEnd, setDateStart, setType_id, clearForm, setDay, setEdit, setError, setId, setSuccess, setEarly, setNormal, setSpecial, setWeekend } = seatSlice.actions;
export default seatSlice.reducer;
