import { createSlice } from "@reduxjs/toolkit";

// Initial state of the loading slice
const initialState = {
  isAppLoading: false, // Flag indicating whether the entire application is currently loading
  isButtonLoading: false, // Flag indicating whether a specific button is currently in a loading state (e.g., for submitting data)
};

// Creating the loading slice
const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    // Activates the application loading state, indicating that the app is currently processing a task
    enableAppLoading(state) {
      state.isAppLoading = true;
    },
    // Deactivates the application loading state, indicating that the app has finished processing
    disableAppLoading(state) {
      state.isAppLoading = false;
    },
    // Activates the button loading state, indicating that the button is in a loading state (e.g., waiting for an API response)
    enableButtonLoading(state) {
      state.isButtonLoading = true;
    },
    // Deactivates the button loading state, indicating that the button is no longer in a loading state and can be interacted with
    disableButtonLoading(state) {
      state.isButtonLoading = false;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
