import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    text: "",
  },
  reducers: {
    setMessage: (state, action) => {
      state.text = action.payload;
    },
    clearMessage: (state) => {
      state.text = "";
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;