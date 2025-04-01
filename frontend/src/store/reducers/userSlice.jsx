import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Armazena os dados do usuário
  token: localStorage.getItem('token') || null, // Recupera o token do localStorage
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user || null; // Evita erro caso `user` seja undefined
      state.token = action.payload.token || null; // Evita erro caso `token` seja undefined
      localStorage.setItem('token', state.token); // Garante que o token é salvo
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Remove o token ao deslogar
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;