import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getShowTime = createAsyncThunk('auth/getShowTime', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/showtimes?size=1000');
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const addShowTime = createAsyncThunk('auth/addShowTime', async (formData, { rejectWithValue }) => {
    console.log(formData);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.post('http://localhost:8080/api/v1/showtimes', formData, {
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
        const response = await axios.delete(`http://localhost:8080/api/v1/showtimes/${id}`, {
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
        const response = await axios.put(`http://localhost:8080/api/v1/showtimes/${id}`, data, {
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
        clearForm: (state) => { state.movie = null; state.room = null; state.isEdit = false; state.id = '' },
        setEdit: (state, action) => { state.isEdit = action.payload },
        setId: (state, action) => { state.id = action.payload },
        setSuccess: (state) => { state.success = false },
        setError: (state) => { state.error = null },
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

export const {setRoomCtr, setDataMovie, setErrors, setShowtimes, addShowtime, clearShowtimes, setDurration, setMovie, setRoom, clearForm, setEdit, setError, setSuccess, setId } = addShowTimeSlice.actions;
export default addShowTimeSlice.reducer;