import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mostrarListarIncluir: true
};

const listarIncluirSlice = createSlice({
    name: "listarIncluir",
    initialState,
    reducers: {
        setMostrarListarIncluir: (state, action) => {
            state.mostrarListarIncluir = action.payload;
        }
    }
});

export const { setMostrarListarIncluir } = listarIncluirSlice.actions;
export default listarIncluirSlice.reducer;