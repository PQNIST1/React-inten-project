import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paymentMethod: {
        name: '',
        image: '',
    },
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPaymentMethod: (state, action) => {
            state.paymentMethod.name = action.payload.name;
            state.paymentMethod.image = action.payload.image;
        },
        clearPaymentMethod: (state) => {
            state.paymentMethod.name = '';
            state.paymentMethod.image = '';
        },
    },
});

export const { setPaymentMethod, clearPaymentMethodl } = paymentSlice.actions;
export default paymentSlice.reducer;