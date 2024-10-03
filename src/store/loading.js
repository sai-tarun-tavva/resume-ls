import { createSlice } from "@reduxjs/toolkit";

// Initial state of the loading slice
const initialState = {
  isLoading: false, // Indicates if loading is currently active
};

// Creating the loading slice
const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    // Enables loading state
    enableLoading(state) {
      state.isLoading = true;
    },
    // Disables loading state
    disableLoading(state) {
      state.isLoading = false;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
