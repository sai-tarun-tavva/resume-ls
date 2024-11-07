import { createSlice } from "@reduxjs/toolkit";

// Initial state for the data slice
const initialState = {
  description: "", // Description text input by the user
  selectedAI: "", // Selected AI model
  selectedActions: [], // Array of selected actions
};

// Creating the data slice
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Updates the description state with the provided payload
    updateDescription(state, { payload }) {
      state.description = payload;
    },
    // Updates the selected AI model with the provided payload
    updateSelectedAI(state, { payload }) {
      state.selectedAI = payload;
    },
    // Updates the selected actions array with the provided payload
    updateSelectedActions(state, { payload }) {
      state.selectedActions = payload;
    },
  },
});

// Exporting actions and reducer for the data slice
export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
