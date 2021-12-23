import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
  userId: string;
}

const initialState: AuthState = {
  token: '',
  userId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeAuthData: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    removeAuthData: (state) => {
      state.token = '';
      state.userId = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeAuthData, removeAuthData } = authSlice.actions;

export default authSlice.reducer;
