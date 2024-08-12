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

export const updatePassword = createAsyncThunk('auth/updatePassword', async (formData, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.patch('http://localhost:8080/api/v1/users/change-password', formData, {
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

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return rejectWithValue('No access token found');
  }
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auths/logout', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
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
    success: false,
  },
  reducers: {
    setAccessToken(state, action) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
      localStorage.removeItem('accessToken');
    },
    setSuccess: (state) => { state.success = false },
    setError: (state) => { state.error = null },
    // checkAccessTokenExpiration(state) {
    //   const token = localStorage.getItem('accessToken');
    //   if (token) {
    //     const decodedToken = jwtDecode(token);
    //     const expirationDate = new Date(0);
    //     expirationDate.setUTCSeconds(decodedToken.exp);
    //     if (state.isLogged && expirationDate) {
    //       const currentTime = new Date();
    //       if (currentTime >= new Date(expirationDate)) {
    //         localStorage.removeItem('accessToken');
    //         window.location.href = '/';
    //         dispatch(logoutUser());
    //       }
    //     }
    //   }

    // },
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
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const logoutAndNavigate = () => (dispatch) => {
  dispatch(logout());
  dispatch(logoutUser());
  window.location.href = '/';
};

export const checkAccessTokenExpiration = () => {
  return (dispatch) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      const currentTime = new Date();
      if (currentTime >= expirationDate) {
        localStorage.removeItem('accessToken');
        dispatch(logoutUser());
        window.location.href = '/';
      }
    }
  };
};

export const { setAccessToken, logout, setError, setSuccess } = logginSlice.actions;

export default logginSlice.reducer;
