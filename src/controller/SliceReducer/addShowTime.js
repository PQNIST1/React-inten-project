import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {url} from  './img';

export const getShowTime = createAsyncThunk('auth/getShowTime', async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`${url}showtimes?size=10000`,{
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

export const getShowTimeMovie = createAsyncThunk('auth/getShowTimeMovie', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${url}movies/${id}/showtimes`);
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const getShowTimeDate = createAsyncThunk('auth/getShowtimDate', async (date, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${url}showtimes/date?date=${date}`
           );
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const addShowTime = createAsyncThunk('auth/addShowTime', async (formData, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.post(`${url}showtimes`, formData, {
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

export const deleteShowTime = createAsyncThunk('auth/deleteShowTime', async (id, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.delete(`${url}showtimes/${id}`, {
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

export const editShowTime = createAsyncThunk('auth/updateShowTime', async ({ id, data }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.put(`${url}showtimes/${id}`, data, {
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



const addShowTimeSlice = createSlice({
    name: 'showTime',
    initialState: {
        roomCtr: false,
        data: [],
        show:[],
        date:[],
        dataMovie:[],
        status: 'idle',
        durration: '',
        movie: null,
        room: null,
        loading: false,
        error: null,
        success: false,
        isEdit: false,
        id: '',
        showtimes: [],
        errors: [],
    },
    reducers: {
        setRoomCtr(state,action) {
            state.roomCtr = action.payload;
        },
        setDataMovie(state, action) {
            state.dataMovie = action.payload;
        },
        setShowtimes(state, action) {
            state.showtimes = action.payload;
        },
        addShowtime(state, action) {
            state.showtimes.push(action.payload);
        },
        clearShowtimes(state) {
            state.showtimes = [];
        },
        setErrors(state, action) {
            state.errors = action.payload;
        },
        setDurration: (state, action) => { state.durration = action.payload },
        setMovie: (state, action) => { state.movie = action.payload },
        setRoom: (state, action) => { state.room = action.payload },
        clearForm: (state) => { state.movie = null; state.room = null; state.isEdit = false; state.id = ''; state.showtimes = []; },
        setEdit: (state, action) => { state.isEdit = action.payload },
        setId: (state, action) => { state.id = action.payload },
        setSuccess: (state) => { state.success = false },
        setError: (state) => { state.error = null },
        setShow: (state,action) => {
            state.show = action.payload;
        },
        setStatus: (state) => {
            state.status = 'idle'
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getShowTime.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getShowTime.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getShowTime.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(getShowTimeMovie.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getShowTimeMovie.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.show = action.payload;
            })
            .addCase(getShowTimeMovie.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(getShowTimeDate.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getShowTimeDate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.date = action.payload;
            })
            .addCase(getShowTimeDate.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(addShowTime.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addShowTime.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(addShowTime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteShowTime.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteShowTime.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteShowTime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editShowTime.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(editShowTime.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(editShowTime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const {setStatus, setShow, setRoomCtr, setDataMovie, setErrors, setShowtimes, addShowtime, clearShowtimes, setDurration, setMovie, setRoom, clearForm, setEdit, setError, setSuccess, setId } = addShowTimeSlice.actions;
export default addShowTimeSlice.reducer;