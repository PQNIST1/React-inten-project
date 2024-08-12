import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRoom = createAsyncThunk('auth/getRoom', async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get('http://localhost:8080/api/v1/rooms?size=50',{
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

export const addRoom = createAsyncThunk('auth/addRoom', async (formData, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.post('http://localhost:8080/api/v1/rooms', formData, {
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

export const deleteRoom = createAsyncThunk('auth/deleteRoom', async (id, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/rooms/${id}`, {
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

export const editRoom = createAsyncThunk('auth/updateRoom', async ( { id, data }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/rooms/${id}`, data, {
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


const addRoomSlice = createSlice({
    name: 'room',
    initialState: {
        data: [],
        status: 'idle',
        name: '',
        code: '',
        loading: false,
        error: null,
        success: false,
        id: '',
        isEdit: false,
    },
    reducers: {
        setName: (state, action) => { state.name = action.payload },
        setCode: (state, action) => { state.code = action.payload },
        clearForm: (state) => { state.name = ''; state.code = ''; state.isEdit = false; state.id = ''},
        setEdit: (state, action) => { state.isEdit = action.payload },
        setId: (state, action) => { state.id = action.payload },
        setSuccess: (state) => { state.success = false },
        setError : (state) => { state.error = null},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoom.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getRoom.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getRoom.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(addRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(addRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(editRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(editRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { setName, setCode, clearForm, setEdit, setError, setSuccess, setId } = addRoomSlice.actions;
export default addRoomSlice.reducer;