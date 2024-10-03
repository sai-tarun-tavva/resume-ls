import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "",
  darkMode: false,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    updateStatus(state, action) {
      const { message, type, darkMode } = action.payload;

      state.message = message;
      state.type = type;
      state.darkMode = darkMode;
    },
    resetStatus(state) {
      state.message = initialState.message;
      state.type = initialState.type;
      state.darkMode = initialState.darkMode;
    },
  },
});

export const statusActions = statusSlice.actions;
export default statusSlice.reducer;
