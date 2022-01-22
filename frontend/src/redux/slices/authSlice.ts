import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  token: string;
  userId: string;
  username: string;
  userProfilePicture: string;
}

const initialState: AuthState = {
  token: '',
  userId: '',
  username: '',
  userProfilePicture: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeAuthData: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.userProfilePicture = action.payload.userProfilePicture;
    },
    removeAuthData: (state) => {
      state.token = '';
      state.userId = '';
      state.username = '';
      state.userProfilePicture = '';
    },
    updateToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeAuthData, removeAuthData, updateToken } = authSlice.actions;

export default authSlice.reducer;
