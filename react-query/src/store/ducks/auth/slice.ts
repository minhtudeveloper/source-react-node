import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { removeCookie, setCookie } from "utils/cookies";

interface Action {
  type: string;
  payload: any;
}

export interface User {
  email: string;
  accessToken: string;
}

export interface AuthState {
  isToggle: boolean;
  isLoggedIn: boolean;
  loading?: boolean;
  accessToken?: boolean;
  currentUser?: User;
}

const initialState: AuthState = {
  isToggle: false,
  isLoggedIn: false,
  loading: false,
  accessToken: undefined,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loading(state) {
      state.loading = true;
      return state;
    },
    loginSuccess(state, action: Action) {
      setCookie("token", action.payload, { expires: 1 });
      state.isToggle = !state.isToggle;
      state.loading = false;
      return state;
    },
    loginFailed(state) {
      state.loading = false;
      return state;
    },
    logout(state) {
      state.isToggle = !state.isToggle;
      removeCookie("token");
      state.isLoggedIn = false;
      return state;
    },
  },
});

// Get States
export const getLoading = (state: RootState): boolean => state.auth.loading;

// Actions
export const authActions = authSlice.actions;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
