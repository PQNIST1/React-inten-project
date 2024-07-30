import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addSeats = createAsyncThunk('auth/addSeats', async (formData, { dispatch, rejectWithValue }) => {
  try {
    // Gửi yêu cầu thêm ghế cho từng mục trong formData
    await Promise.all(formData.map(data => dispatch(addSeat(data)).unwrap()));
    
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});


export const addSeat = createAsyncThunk('auth/addSeat', async ( formData , {  rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/seats`, formData, {
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

export const deleteSeatss = createAsyncThunk('auth/deleteSeatss', async ( id, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.delete(`http://localhost:8080/api/v1/seats/${id}`, {
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


export const editSeatRoom = createAsyncThunk('auth/updateSeatRoom', async ({  formData, seats_id }, { dispatch, rejectWithValue }) => {
    console.log(seats_id, formData);  
  try {
    if (seats_id && seats_id.length > 0) {
      await Promise.all(seats_id.map(seatId => dispatch(deleteSeatss(seatId.object.id)).unwrap()));
    }
    await Promise.all(formData.map(data => dispatch(addSeat(data)).unwrap()));
    return { success: true }; 
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const getSeatss = createAsyncThunk('auth/getSeatss', async (_, { rejectWithValue }) => {
  try {
      const response = await axios.get('http://localhost:8080/api/v1/seats?size=10000');
      return response.data;
  } catch (error) {
      if (!error.response) {
          throw error;
      }
      return rejectWithValue(error.response.data);
  }
});


const initialState = {
  rows: 0,  
  cols: 0,
  result: [],
  seats: [],
  data:[],
  selectedSeats: [],
  isSaved: false,
  error: null,
  loading: false,
  success: false,
  status:'idle',
};

const seatsSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    setError: (state) => { state.error = null },
    setSuccess: (state) => { state.success = false },
    clearForm : (state) => {
      state.rows = 0; state.cols = 0; state.result = []; state.seats = []; state.isSaved = false;
    },
    setCol: (state, action) => {
      const { rows, cols } = action.payload;
      state.rows = rows;
      state.cols = cols;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setDimensions: (state, action) => {
      const { rows, cols } = action.payload;
      state.rows = rows;
      state.cols = cols;
      const newSeats = Array(rows).fill().map(() => Array(cols).fill(null));
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (state.seats[i] && state.seats[i][j] !== undefined) {
            newSeats[i][j] = state.seats[i][j];
          }
        }
      }
      state.seats = newSeats;
      state.selectedSeats = [];
      state.isSaved = false;
    },
    setSeat: (state, action) => {
      const { row, col, type } = action.payload;
      state.seats[row][col] = type;
    },
    toggleSelectSeat: (state, action) => {
      const { row, col } = action.payload;
      const index = state.selectedSeats.findIndex(seat => seat.row === row && seat.col === col);
      if (index === -1) {
        state.selectedSeats.push({ row, col });
      } else {
        state.selectedSeats.splice(index, 1);
      }
    },
    setSeatsType: (state, action) => {
      const { type } = action.payload;
      const selectedSeats = [...state.selectedSeats];

      // Helper function to set seats of a specific type
      const setSeatsOfType = (seats, type) => {
        seats.forEach(({ row, col }) => {
          if (type !== 'double' && state.seats[row][col] === 'double') {
            // Clear both seats if it was a double seat
            state.seats[row][col] = null;
            if (col + 1 < state.cols) {
              state.seats[row][col + 1] = type;
            }
          }
          state.seats[row][col] = type;

        });
      };

      // Process each group of selected seats based on type
      switch (type) {
        case 'single':
        case 'vip':
          setSeatsOfType(selectedSeats, type);
          break;
        case 'double':
          // Group selected seats by row
          const groupedSeats = selectedSeats.reduce((groups, seat) => {
            const row = seat.row;
            if (!groups[row]) {
              groups[row] = [];
            }
            groups[row].push(seat);
            return groups;
          }, {});

          // Process each group of selected seats
          Object.values(groupedSeats).forEach(seats => {
            // Sort seats by column
            const sortedSeats = seats.sort((a, b) => a.col - b.col);

            // Check if all seats are in the same row and have pairs
            if (sortedSeats.length > 1) {
              for (let i = 0; i < sortedSeats.length - 1; i++) {
                // Check if the next seat is adjacent
                if (sortedSeats[i].col + 1 === sortedSeats[i + 1].col) {
                  const pair = [sortedSeats[i], sortedSeats[i + 1]];
                  setSeatsOfType(pair, 'double');
                  // Skip the next seat as it's already processed
                  i++;
                }
              }
            }
          });
          break;
        default:
          break;
      }

      state.selectedSeats = [];
    },
    clearSelectedSeats: (state) => {
      state.selectedSeats.forEach(({ row, col }) => {
        if (state.seats[row][col] === 'double') {
          // Clear both seats in a double seat
          state.seats[row][col] = null;
          if (col + 1 < state.cols) {
            state.seats[row][col + 1] = null;
          }
        } else {
          state.seats[row][col] = null;
        }
      });
      state.selectedSeats = [];
    },
    resetSeats: (state) => {
      state.seats = Array(state.rows).fill().map(() => Array(state.cols).fill(null));
      state.selectedSeats = [];
      state.isSaved = false;
    },
    saveSeats: (state) => {
      state.isSaved = true;
      // Update seatNumbers for all seats

      state.selectedSeats = [];
    },
    editSeats: (state) => {
      state.isSaved = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getSeatss.pending, (state) => {
      state.status = 'loading';
      state.error = null;
  })
  .addCase(getSeatss.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
  })
  .addCase(getSeatss.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Có lỗi xảy ra';
  })
    .addCase(addSeat.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(addSeat.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    })
    .addCase(addSeat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteSeatss.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(deleteSeatss.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    })
    .addCase(deleteSeatss.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  }
});

export const {setError, setSuccess, clearForm ,setResult, setCol, setDimensions, setSeat, toggleSelectSeat, setSeatsType, clearSelectedSeats, resetSeats, saveSeats, editSeats } = seatsSlice.actions;
export default seatsSlice.reducer;
