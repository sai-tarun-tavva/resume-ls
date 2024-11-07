import { createSlice } from "@reduxjs/toolkit";
import {
  OPERATION_API_UI_KEYS,
  OPERATION_UI_KEYS,
} from "../constants/constants";

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
} = OPERATION_UI_KEYS;

// Initial state for the results slice
const initialState = {
  selectedKey: null, // Currently selected key (for displaying specific results)
  [REVIEW]: null, // Overall assessment of the resume
  [ABOUT]: null, // Information about the resume
  [PERCENTAGE]: null, // Percentage match between the job description and the resume
  [IMPROVE]: null, // Suggestions for improving the resume
  [KEYWORDS]: null, // List of keywords that are missing from the resume
  [QUESTIONS]: null, // Recommended interview questions based on the resume
  [EXPERIENCE]: null, // Relevant experience highlighted in the resume
  [SKILLS]: null, // Desired skills listed in the job description or resume
};

// Creating the result slice
const resultSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    // Updates state with new values based on the payload
    updateState(state, { payload }) {
      Object.entries(payload).forEach(([apiKey, value]) => {
        const operationKey = OPERATION_API_UI_KEYS[apiKey];
        if (operationKey) {
          state[operationKey] = value;
        }
      });
    },
    // Updates the selected key in the state
    updateSelectedKey(state, { payload }) {
      state.selectedKey = payload;
    },
  },
});

// Exporting actions and reducer for the result slice
export const resultActions = resultSlice.actions;
export default resultSlice.reducer;
