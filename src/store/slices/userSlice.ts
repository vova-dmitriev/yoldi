import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "@/interfaces/user.interface";

export interface UserState {
  user: IUser | null;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  error: null,
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
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, resetUser, setError, resetError } = userSlice.actions;

export default userSlice.reducer;
