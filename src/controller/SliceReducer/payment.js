import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {url} from  './img';


export const addBooking = createAsyncThunk('auth/addBooking', async (formData, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.post(`${url}bookings`, formData, {
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

export const addBookingAdmin = createAsyncThunk('auth/addBookingAdmin', async ({ formData, phone, method }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.post(`${url}bookings/direct-payment?phone=${phone}&method=${method}`, formData, {
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



export const getBookingUser = createAsyncThunk('auth/getBookingUser', async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`${url}bookings/User`, {
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

export const getBooking = createAsyncThunk('auth/getBooking', async (id, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`${url}bookings/${id}`, {
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

export const getBookingReturn = createAsyncThunk('auth/getBookingReturn', async (search, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`${url}bookings/return?${search}`, {
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

export const getBookingSeats = createAsyncThunk('auth/getBookingSeats', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${url}showtimes/${id}/seats`);
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const getBookingPrice = createAsyncThunk('auth/getBookingPrice', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${url}showtimes/${id}/prices`);
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
    booking: [],
    seats: [],
    status: 'idle',
    paymentMethod: {
        name: '',
        image: '',
        method: ''
    },
    loading: false,
    error: null,
    success: false,
    phone: '',
    price: [],
    currentPage: 1,
    itemsPerPage: 3,
    visibleBookings: [],
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPaymentMethod: (state, action) => {
            state.paymentMethod.name = action.payload.name;
            state.paymentMethod.image = action.payload.image;
            state.paymentMethod.method = action.payload.method;
        },
        clearPaymentMethod: (state) => {
            state.paymentMethod.name = '';
            state.paymentMethod.image = '';
            state.paymentMethod.method = '';
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setVisibleBookings(state, action) {
            state.visibleBookings = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const paymentUrl = action.payload.data.paymentUrl;
                window.location.href = paymentUrl;
            })
            .addCase(addBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addBookingAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addBookingAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const paymentUrl = action.payload.data.paymentUrl;
                if (paymentUrl) {
                    window.location.href = paymentUrl;
                } else {
                    window.location.href = '/ticket/#ticket?page=1';
                }
            })
            .addCase(addBookingAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getBookingUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getBookingUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.visibleBookings = action.payload.data.slice(0, state.itemsPerPage);
            })
            .addCase(getBookingUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(getBooking.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getBooking.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.booking = action.payload;
            })
            .addCase(getBooking.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(getBookingReturn.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getBookingReturn.fulfilled, (state, action) => {
                state.status = 'succeeded';
                window.location.href = '/info/#history'
            })
            .addCase(getBookingReturn.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(getBookingSeats.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getBookingSeats.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.seats = action.payload;
            })
            .addCase(getBookingSeats.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(getBookingPrice.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getBookingPrice.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.price = action.payload;
            })
            .addCase(getBookingPrice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            });

    }
});

export const { setPaymentMethod, clearPaymentMethodl, setPhone, setStatus, setVisibleBookings, setCurrentPage } = paymentSlice.actions;
export default paymentSlice.reducer;