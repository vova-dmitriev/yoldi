import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PASSWORD } from "@/constants/localStorage";
import { IUser } from "@/interfaces/user.interface";

export interface UserState {
  user: IUser | null;
  password: string;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  error: null,
  password: localStorage?.getItem("password") || "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
      state.password = "";
      localStorage.removeItem(PASSWORD);
    },

    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      localStorage.setItem(PASSWORD, action.payload);
    },
    resetPassword: (state) => {
      state.password = "";
      localStorage.removeItem(PASSWORD);
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUser,
  resetUser,
  setError,
  resetError,
  setPassword,
  resetPassword,
} = userSlice.actions;

export default userSlice.reducer;
