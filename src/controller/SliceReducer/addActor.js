import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {url} from  './img';

export const getActor = createAsyncThunk('auth/getActor', async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`${url}casts?size=10000`,{
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

export const addActor = createAsyncThunk('auth/addActor', async (formData, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.post(`${url}v1/casts`, formData, {
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

export const deleteActor = createAsyncThunk('auth/deleteActor', async (id, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.delete(`${url}casts/${id}`, {
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

export const editActor = createAsyncThunk('auth/updateActor', async ( { id, data }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.put(`${url}casts/${id}`, data, {
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

const addActorSlice = createSlice({
    name: 'actor',
    initialState: {
        data: [],
        status: 'idle',
        name: '',
        loading: false,
        error: null,
        success: false,
        id: '',
        isEdit: false,
    },
    reducers: {
        setName: (state, action) => { state.name = action.payload },
        setEdit: (state, action) => { state.isEdit = action.payload },
        setId: (state, action) => { state.id = action.payload },
        setSuccess: (state) => { state.success = false },
        setError : (state) => { state.error = null},
        clearForm: (state) => { state.name = ''; state.isEdit = false; state.id = ''; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getActor.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getActor.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getActor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(addActor.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addActor.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(addActor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteActor.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteActor.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteActor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editActor.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(editActor.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(editActor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});
export const {setName, clearForm, setEdit, setId ,setError ,setSuccess} = addActorSlice.actions;
export default addActorSlice.reducer;