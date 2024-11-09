import { createSlice } from "@reduxjs/toolkit";
import { OPERATION_UI_KEYS } from "../constants/constants";

// Destructuring operation keys for easier access
const {
  REVIEW,
  ABOUT,
  PERCENTAGE,
  IMPROVE,
  KEYWORDS,
  QUESTIONS,
  EXPERIENCE,
  SKILLS,
  HASHTAGS,
} = OPERATION_UI_KEYS;

// Initial state for the results slice
const initialState = {
  selectedKey: null, // Currently selected key (for displaying specific results)
  headerTabs: {
    [REVIEW]: null, // Overall assessment of the resume
    [ABOUT]: null, // Information about the resume
    [PERCENTAGE]: null, // Percentage match between the job description and the resume
    [IMPROVE]: null, // Suggestions for improving the resume
    [KEYWORDS]: null, // List of keywords that are missing from the resume
    [QUESTIONS]: null, // Recommended interview questions based on the resume
    [EXPERIENCE]: null, // Relevant experience highlighted in the resume
    [SKILLS]: null, // Desired skills listed in the job description or resume
    [HASHTAGS]: null, // Hashtags
  },
};

/**
 * Results slice for managing and displaying results related to resume analysis.
 * Tracks selected key, overall resume assessment, and suggested improvements.
 */
const resultSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    /**
     * Updates the state with new result data for a specific action.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {string} action.payload.action - The key representing the result section to update.
     * @param {*} action.payload.value - The value to store in the specified result section.
     */
    appendState(state, { payload: { action, value } }) {
      state.headerTabs[action] = value;
    },

    /**
     * Updates the selected key in the state, determining which result section to display.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {string|null} action.payload - The key to set as the selected key.
     */
    updateSelectedKey(state, { payload }) {
      state.selectedKey = payload;
    },

    /**
     * Resets the state to its initial values, clearing all result data.
     *
     * @returns {Object} The initial state of the slice.
     */
    resetState() {
      return initialState;
    },
  },
});

// Exporting actions and reducer for the result slice
export const resultActions = resultSlice.actions;
export default resultSlice.reducer;
