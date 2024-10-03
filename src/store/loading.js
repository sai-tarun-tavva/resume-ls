import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    enableLoading(state) {
      state.isLoading = true;
    },
    disableLoading(state) {
      state.isLoading = false;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
