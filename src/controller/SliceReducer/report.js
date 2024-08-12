import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getTickets = createAsyncThunk('auth/getTickets', async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/bookings?size=10000`, {
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

export const getMovieReport = createAsyncThunk('auth/getMovieReport', async ( {fromDate, toDate}, { rejectWithValue }) => { 
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/reports/movie?fromDate=${fromDate}&toDate=${toDate}`, {
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

export const getDailyReport = createAsyncThunk('auth/getDailyReport', async ( {fromDate, toDate}, { rejectWithValue }) => { 
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/reports/daily?fromDate=${fromDate}&toDate=${toDate}`, {
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

export const getMonthReport = createAsyncThunk('auth/getMonthReport', async ( {fromDate, toDate}, { rejectWithValue }) => { 
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/reports/monthly?fromDate=${fromDate}&toDate=${toDate}`, {
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
    movie:[],
    daily: [],
    month: [],
    dateStart: null,
    dateEnd: null,
    error: null,
    success: false,
    status: 'idle',
    loading: false,
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setDateStart: (state, action) => {
            state.dateStart = action.payload;
        },
        setDateEnd: (state, action) => {
            state.dateEnd = action.payload;
        },
        clearForm: (state) => {
            state.dateStart = null; state.dateEnd = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.status = 'successded';
                state.data = action.payload;
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(getMovieReport.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getMovieReport.fulfilled, (state, action) => {
                state.status = 'successded';
                state.movie = action.payload;
            })
            .addCase(getMovieReport.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(getDailyReport.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getDailyReport.fulfilled, (state, action) => {
                state.status = 'successded';
                state.daily = action.payload;
            })
            .addCase(getDailyReport.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(getMonthReport.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getMonthReport.fulfilled, (state, action) => {
                state.status = 'successded';
                state.month = action.payload;
            })
            .addCase(getMonthReport.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            });
    }
});
export const {setDateStart, setDateEnd, clearForm} = reportSlice.actions;
export default reportSlice.reducer;