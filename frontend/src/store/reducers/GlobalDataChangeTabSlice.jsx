import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: "",
    name: "",
    month: 1,
    year: 1970,
    credits: [],
    debts: []
};

const globalDataChangeTabSlice = createSlice({
    name: 'globalDataChange',
    initialState,
    reducers: {
        setDataCycle(state, action) {
            return { ...state, ...action.payload };
        },
        resetDataCycle() {
            return initialState;
        },
    }
});

export const { setDataCycle, resetDataCycle } = globalDataChangeTabSlice.actions;
export default globalDataChangeTabSlice.reducer;