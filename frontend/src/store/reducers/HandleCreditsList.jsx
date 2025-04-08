import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    creditsListState: [] // Estado inicial como array vazio
};

const creditsSlice = createSlice({
    name: "credits",
    initialState,
    reducers: {
        setCreditsListState: (state, action) => {
            state.creditsListState = action.payload;
        },
        addCredit: (state) => {
            state.creditsListState.push({ name: "", value: "" });
        },
        updateCredit: (state, action) => {
            const { index, field, value } = action.payload;
            state.creditsListState[index] = { ...state.creditsListState[index], [field]: value };
        },
        removeCredit: (state, action) => {
            state.creditsListState = state.creditsListState.filter((_, i) => i !== action.payload);
        }
    }
});

export const { setCreditsListState, addCredit, updateCredit, removeCredit } = creditsSlice.actions;
export default creditsSlice.reducer;