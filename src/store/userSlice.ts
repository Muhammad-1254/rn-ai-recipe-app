import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

type UserInitialState = {
  userId: null | string;
  username: null | string;
  email: null | string;
  isLoading: boolean;
  isAuth: boolean;
};
export const userInitialState: UserInitialState = {
  userId: null,
  username: null,
  email: null,
  isLoading: false,
  isAuth: SecureStore.getItem("isAuth") ? true : false,
};

const userSlice = createSlice({
  name: "user",
  initialState:userInitialState,
  reducers: {
    setUser: (state, action) => {
      for (const key in action.payload) {
        switch (key) {
          case "userId":
            state.userId = action.payload.userId;
            break;
          case "username":
            state.username = action.payload.username;
            break;
          case "email":
            state.email = action.payload.email;
            break;

          case "isLoading":
            state.isLoading = action.payload.isLoading;
            break;

          case "isAuth":
            SecureStore.setItem(
              "isAuth",
              action.payload.isAuth ? "true" : "false"
            );
            state.isAuth = action.payload.isAuth;
            break;
          default:
            break;
        }
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
