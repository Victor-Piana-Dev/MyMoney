import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  billings: [],  
};

const billingCycleSlice = createSlice({
  name: 'billingCycles',
  initialState,
  reducers: {
    setBillings: (state, action) => {

      state.billings = action.payload;
    },
  },
});

export const { setBillings } = billingCycleSlice.actions;  
export default billingCycleSlice.reducer;  