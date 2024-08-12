import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";




export const getCategory = createAsyncThunk('auth/getCategory', async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/genres?size=50`,{
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


export const addCategory = createAsyncThunk('auth/addCategory', async (formData, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.post('http://localhost:8080/api/v1/genres', formData, {
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

export const deleteCategory = createAsyncThunk('auth/deleteCategory', async (id, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.delete(`http://localhost:8080/api/v1/genres/${id}`, {
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


export const editCategory = createAsyncThunk('auth/updateCategory', async ( { id, data }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No access token found');
    }
    try {
        const response = await axios.put(`http://localhost:8080/api/v1/genres/${id}`, data, {
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

const addCategorySlice = createSlice({
    name: 'category',
    initialState: {
        data: [],
        status: 'idle',
        id:'',
        name: '',
        loading: false,
        error: null,
        success: false,
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
            .addCase(getCategory.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Có lỗi xảy ra';
            })
            .addCase(addCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setName, setId, setEdit, setSuccess, setError, clearForm} = addCategorySlice.actions;
export default addCategorySlice.reducer;