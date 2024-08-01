import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getSeatRoom = createAsyncThunk('auth/getSeatRoom', async ( id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/rooms/${id}/seats`);
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
  seatsRoom: [],
  seats:[],
  selectedSeats: [],
  isSaved: true,
  error: null,
  success: false,
  status: 'idle',
  isEdit: false,
  showAlert: false,
};

const seatsEditSlice = createSlice({
  name: 'seatsEdit',
  initialState,
  reducers: {
    setAlert : (state, action) => {  state.showAlert = action.payload },
    setSeat: (state,action) => {
       state.seats = action.payload;
    },
    setCol: (state, action) => {
      const { rows, cols } = action.payload;
      state.rows = rows;
      state.cols = cols;
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

    toggleSelectSeat: (state, action) => {
      const { row, col } = action.payload;
      const index = state.selectedSeats.findIndex(seat => seat.row === row && seat.col === col);
      if (index === -1) {
        state.selectedSeats.push({ row, col });
      } else {
        state.selectedSeats.splice(index, 1);
      }
    },
    toggleBookingSeat: (state, action) => {
      const { row, col } = action.payload;
      const index = state.selectedSeats.findIndex(seat => seat.row === row && seat.col === col);
      const isSelected = index !== -1;
  
      // Hàm để tính số lượng ghế đã chọn, tính cả ghế đôi
      const calculateSelectedSeatsCount = () => {
          let count = 0;
          state.selectedSeats.forEach(seat => {
              if (isDoubleSeat(seat.row, seat.col)) {
                  count += 2; // Ghế đôi được tính là 2 ghế
              } else {
                  count += 1; // Ghế đơn được tính là 1 ghế
              }
          });
          return count;
      };
  
      // Hàm kiểm tra xem ghế có phải là ghế đôi không
      const isDoubleSeat = (row, col) => {
          return state.seats[row][col] === 'double';
      };
  
      // Nếu ghế đã được chọn, xóa nó khỏi danh sách
      if (isSelected) {
          state.selectedSeats.splice(index, 1);
      } else {
          // Trước khi thêm ghế mới, kiểm tra tổng số ghế hiện tại cộng thêm ghế mới
          const newCount = calculateSelectedSeatsCount() + (isDoubleSeat(row, col) ? 2 : 1);
          
          if (newCount > 8) { 
              state.showAlert = true;       
              return;
          }
          state.selectedSeats.push({ row, col });
        
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
      .addCase(getSeatRoom.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getSeatRoom.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.seatsRoom = action.payload;
      })
      .addCase(getSeatRoom.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Có lỗi xảy ra';
      })
    }
});

export const { setAlert, setSeat, toggleBookingSeat, setCol, setDimensions, toggleSelectSeat, setSeatsType, clearSelectedSeats, resetSeats, saveSeats, editSeats } = seatsEditSlice.actions;
export default seatsEditSlice.reducer;
