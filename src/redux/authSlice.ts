// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';


interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      Cookies.remove('bpmAccessToken')
      Cookies.remove('bpmRefreshToken')
      Cookies.remove('bpmUserEmail')
      Cookies.remove('bpmUsername')
    },
  },
});

export const { setAccessToken, setLoading, logout } = authSlice.actions;

export default authSlice.reducer;
