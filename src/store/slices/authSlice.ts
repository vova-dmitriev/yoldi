import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { X_API_KEY } from "@/constants/localStorage";

export interface AuthState {
  error: string | null;
}

const initialState: AuthState = {
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.error = null;
      localStorage.removeItem(X_API_KEY);
    },
  },
});

export const { setError, resetError, logout } = authSlice.actions;

export default authSlice.reducer;
