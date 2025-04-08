import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    debtsListState: [] // Estado inicial como array vazio
};

const debtsSlice = createSlice({
    name: "debts",
    initialState,
    reducers: {
        setDebtsListState: (state, action) => {
            state.debtsListState = action.payload;
        },
        addDebit: (state) => {
            state.debtsListState.push({ name: "", value: "", status: "PENDENTE" });
        },
        updateDebit: (state, action) => {
            const { index, field, value } = action.payload;
            state.debtsListState[index] = { ...state.debtsListState[index], [field]: value };
        },
        removeDebit: (state, action) => {
            state.debtsListState = state.debtsListState.filter((_, i) => i !== action.payload);
        }
    }
});

export const { setDebtsListState, addDebit, updateDebit, removeDebit } = debtsSlice.actions;
export default debtsSlice.reducer;