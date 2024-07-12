import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';





export const getSeatType = createAsyncThunk('auth/getSeatType', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/seat-type');
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});


export const addSeatType = createAsyncThunk('auth/addSeatType', async (formData, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post('http://localhost:8080/api/v1/seat-type', formData, {
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

export const deleteSeatType = createAsyncThunk('auth/deleteSeatType', async (id, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
      return rejectWithValue('No access token found');
  }
  try {
      const response = await axios.delete(`http://localhost:8080/api/v1/seat-type/${id}`, {
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
    const response = await axios.post('http://localhost:8080/api/v1/seat-price', formData, {
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
  dateStart: null,
  dateEnd: null,
  name: '',
  code: '',
  price: '',
  normalDay: true,
  weekend: false,
  specialDay: false,
  earlyShow: false,
  loading: false,
  type_id:null,
  error: null,
  success: false,
  status: 'idle',
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
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setNormalDay: (state, action) => {
      state.normalDay = action.payload;
    },
    setWeekend: (state, action) => {
      state.weekend = action.payload;
    },
    setSpecialDay: (state, action) => {
      state.specialDay = action.payload;
    },
    setEarlyShow: (state, action) => {
      state.earlyShow = action.payload;
    },
    setType_id: (state, action) => {
      state.type_id = action.payload;
    },
    clearForm : (state) => {
      state.name = ''; state.code = ''; state.dateStart = null; state.dateEnd = null; state.normalDay = true; state.weekend = false; state.specialDay = false; state.earlyShow = false; state.price = '';
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
      });
  }
});

export const {setName, setCode, setPrice,  setDateEnd, setDateStart, setNormalDay, setWeekend, setSpecialDay, setEarlyShow, setType_id, clearForm} = seatSlice.actions;
export default seatSlice.reducer;
