import { createSlice } from "@reduxjs/toolkit";

// Initial state for the Nexus slice
const initialState = {
  /**
   * @property {Array} overview - Stores the scraped overview data of the website.
   */
  overview: [],
};

/**
 * Result slice for managing and displaying results related to web scraping.
 */
const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    /**
     * Updates the overview data in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {Object} action.payload - The scraped overview data.
     */
    updateOverview(state, { payload }) {
      state.overview = payload;
    },

    /**
     * Resets the state to its initial values.
     *
     */
    resetState() {
      return { ...initialState };
    },
  },
});

// Exporting actions and reducer for the Nexus slice
export const resultActions = resultSlice.actions;
export default resultSlice.reducer;
