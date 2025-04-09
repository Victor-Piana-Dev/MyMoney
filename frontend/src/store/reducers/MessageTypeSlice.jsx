import { createSlice } from "@reduxjs/toolkit";

const messageTypeSlice = createSlice({
  name: "messageType",
  initialState: {
    type: "success", // valor inicial
  },
  reducers: {
    setMessageType: (state, action) => {
      state.type = action.payload; // aceita 'success' ou 'error'
    },
    resetMessageType: (state) => {
      state.type = "success";
    },
  },
});

export const { setMessageType, resetMessageType } = messageTypeSlice.actions;
export default messageTypeSlice.reducer;