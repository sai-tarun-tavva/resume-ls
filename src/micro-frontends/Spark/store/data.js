import { createSlice } from "@reduxjs/toolkit";

// Initial state for the data slice
const initialState = {
  description: "", // Description text input by the user
  selectedAI: "", // Selected AI model
  selectedActions: [], // Array of selected actions
};

/**
 * Data slice for managing application state related to description input,
 * selected AI model, and chosen actions.
 */
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    /**
     * Updates the description state with the provided payload.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action containing payload data.
     * @param {string} action.payload - The new description text to set.
     */
    updateDescription(state, { payload }) {
      state.description = payload;
    },

    /**
     * Updates the selected AI model with the provided payload.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action containing payload data.
     * @param {string} action.payload - The AI model to set as selected.
     */
    updateSelectedAI(state, { payload }) {
      state.selectedAI = payload;
    },

    /**
     * Updates the selected actions array with the provided payload.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action containing payload data.
     * @param {Array} action.payload - Array of actions to set as selected.
     */
    updateSelectedActions(state, { payload }) {
      state.selectedActions = payload;
    },
  },
});

// Exporting actions and reducer for the data slice
export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
