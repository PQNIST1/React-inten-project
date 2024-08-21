import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {url} from  './img';


export const getSpecialDay = createAsyncThunk('auth/getSpecialDay', async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`${url}special-days`, {
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


export const addSpecialDay = createAsyncThunk('auth/addSpecialDay', async (data, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.post(`${url}special-days`, data, {
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

export const deleteSpecialDay = createAsyncThunk('auth/deleteSpecialDay', async (id, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.delete(`${url}special-days/${id}`, {
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

export const editDate = createAsyncThunk('auth/updateDate', async ( { id, data }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.put(`${url}special-days/${id}`, data, {
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
    dateStart: null,
    dateEnd: null,
    name: '',
    error: null,
    success: false,
    status: 'idle',
    loading: false,
    id:'',
    isEdit: false,
}

const specialSlice = createSlice({
    name: 'special',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setDateStart: (state, action) => {
            state.dateStart = action.payload;
        },
        setDateEnd: (state, action) => {
            state.dateEnd = action.payload;
        },
        setSuccess: (state) => { state.success = false },
        setError : (state) => { state.error = null},
        setEdit: (state, action) => { state.isEdit = action.payload },
        setId: (state, action) => { state.id = action.payload },
        clearForm: (state) => {
            state.name = ''; state.dateStart = null; state.dateEnd = null; state.id = ''; state.isEdit = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSpecialDay.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getSpecialDay.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getSpecialDay.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(addSpecialDay.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addSpecialDay.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(addSpecialDay.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteSpecialDay.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteSpecialDay.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteSpecialDay.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editDate.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(editDate.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(editDate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});
export const { setName, setDateStart, setDateEnd, clearForm, setEdit, setId, setSuccess, setError } = specialSlice.actions;
export default specialSlice.reducer;