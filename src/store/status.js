import { createSlice } from "@reduxjs/toolkit";

// Initial state for the status slice
const initialState = {
  message: "", // Message to be displayed
  type: "", // Type of the message (e.g., success, error)
  darkMode: false, // Indicates if dark mode is enabled
};

// Creating the status slice
const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    // Updates the status with new values from the payload
    updateStatus(state, action) {
      const { message, type, darkMode } = action.payload;

      // Updating state properties
      state.message = message;
      state.type = type;
      state.darkMode = darkMode;
    },
    // Resets the status state to its initial values
    resetStatus(state) {
      // Resetting to initial state values
      state.message = initialState.message;
      state.type = initialState.type;
      state.darkMode = initialState.darkMode;
    },
  },
});

export const statusActions = statusSlice.actions;
export default statusSlice.reducer;
