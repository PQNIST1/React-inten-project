// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export const logginUser = createAsyncThunk('auth/logginUser', async (userData, { rejectWithValue, fulfillWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auths/login', userData);
    const accessToken = response.data.data.accessToken;
    localStorage.setItem('accessToken', accessToken);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});


export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue, fulfillWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/users/register', userData);
    const accessToken = response.data.data.accessToken;
    localStorage.setItem('accessToken', accessToken);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data)
  }
});




const logginSlice = createSlice({
  name: 'loggin',
  initialState: {
    user: false,
    loading: false,
    error: null,
    isLogged: false,
  },
  reducers: {
    setAccessToken(state, action) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
      localStorage.removeItem('accessToken');
    },
    checkAccessTokenExpiration(state) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(decodedToken.exp);
        if (state.isLogged && expirationDate) {
          const currentTime = new Date();
          if (currentTime >= new Date(expirationDate)) {
            localStorage.removeItem('accessToken');
            window.location.href = '/';
          }
        }
      }

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logginUser.fulfilled, (state) => {
        state.loading = false;
        state.user = true;
      })
      .addCase(logginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đăng nhập không thành công';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.user = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đã xảy ra lỗi';
      });
  },
});
export const logoutAndNavigate = () => (dispatch) => {
  dispatch(logout());
  window.location.href = '/';
};

export const { setAccessToken, logout, checkAccessTokenExpiration } = logginSlice.actions;

export default logginSlice.reducer;
