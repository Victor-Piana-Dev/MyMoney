import { createSlice } from "@reduxjs/toolkit";

export const billingCycleSlice = createSlice({
    name: 'billing',
    initialState:{
        cycle: []
    },
    reducers: {
        addCycle: (state, action) => {
            state.cycle = state.cycle.concat(action.payload)
        },
        removeCycle: (state, action) => {
            state.cycle = state.cycle.filter(cycle => cycle.id !== action.payload.id)
        }
    }

})

export const {addCycle, removeCycle} = billingCycleSlice.actions

export default billingCycleSlice.reducer