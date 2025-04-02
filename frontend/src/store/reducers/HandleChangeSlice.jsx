// import { createSlice } from "@reduxjs/toolkit";

// export const handleChangeSlice = createSlice({
//     name: 'handleChange',
//     initialState:{
//         cycle: []
//     },
//     reducers: {
//         addCycle: (state, action) => {
//             state.cycle = state.cycle.concat(action.payload)
//         },
//         removeCycle: (state, action) => {
//             state.cycle = state.cycle.filter(cycle => cycle.id !== action.payload.id)
//         }
//     }

// })

// export const {addCycle, removeCycle} = billingCycleSlice.actions

// export default billingCycleSlice.reducer



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mostrarAlterar: false
};

const mostrarAlterarSlice = createSlice({
    name: "mostrarAlterar",
    initialState,
    reducers: {
        setMostrarAlterar: (state, action) => {
            state.mostrarAlterar = action.payload;
        }
    }
});

export const { setMostrarAlterar } = mostrarAlterarSlice.actions;
export default mostrarAlterarSlice.reducer;