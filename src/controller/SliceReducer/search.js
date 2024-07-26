import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchQuery: '',
}

const searchSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        clearSearch: (state) => {
            state.searchQuery = '';
        }
    },
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;