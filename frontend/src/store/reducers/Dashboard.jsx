import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: 'dash',
    initialState:{
        dboard: []
    },
    reducers: {
        addDash: (state, action) => {
            state.dboard = state.dboard.concat(action.payload)
        },
        removeDash: (state, action) => {
            state.dboard = state.dboard.filter(dboard => dboard.id !== action.payload.id)
        }
    }

})

export const {addDash, removeDash} = dashboardSlice.actions

export default dashboardSlice.reducer