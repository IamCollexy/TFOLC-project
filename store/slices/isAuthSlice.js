import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  accessToken: null,
  refreshToken: null,
};

export const isAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      const { isAuth, accessToken } = action.payload;
      state.isAuth = isAuth;
      state.accessToken = accessToken;
      // state.refreshToken = refreshToken;
    },
    logOut: (state, action) => {
      state.isAuth = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setIsAuth, logOut } = isAuthSlice.actions;
export default isAuthSlice.reducer;
