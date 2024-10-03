import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startIndex: 0,
  shouldRefetch: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    updateStartIndex(state, { payload }) {
      state.startIndex = payload;
    },
    updateShouldRefetch(state, { payload }) {
      state.shouldRefetch = payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
