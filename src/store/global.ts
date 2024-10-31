import { createSlice } from "@reduxjs/toolkit";

type GlobalState = {
  modelVisible: boolean;
  modelType: "profile"|null;
};

export const globalInitialState: GlobalState = {
  modelVisible: false,
  modelType:null
};

const globalSlice = createSlice({
  name: "global",
  initialState:globalInitialState,
  reducers: {
    setGlobalState(state, action) {
      for (const key in action.payload) {
        // @ts-ignore
        state[key] = action.payload[key];
      }
    },

    setModelVisible(state, action) {
      state.modelVisible = action.payload;
    },
    setModelType(state, action) {
      state.modelType = action.payload;
    },
  },
});

export const { setModelType, setModelVisible, setGlobalState } =
  globalSlice.actions;
export default globalSlice.reducer;
