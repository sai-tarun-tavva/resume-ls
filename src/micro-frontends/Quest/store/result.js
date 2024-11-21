import { createSlice } from "@reduxjs/toolkit";

// Initial state for the results slice
const initialState = {
  // questions: [],
  questions: [
    "Can you describe your experience with managing cross-functional teams to achieve project objectives?",
    "What strategies do you use to stay updated on the latest industry trends and technologies?",
    "How do you approach problem-solving when faced with unexpected challenges in a project?",
  ],
  conversation: {},
};

/**
 * Results slice for managing and displaying results related to resume analysis.
 */
const resultSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    /**
     * Updates the state with new questions.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {Array} action.payload - The new array of questions.
     */
    updateQuestions(state, { payload }) {
      state.questions = payload;
    },

    /**
     * Updates the state with new conversation data.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {Object} action.payload - The new conversation object.
     */
    updateConversation(state, { payload }) {
      state.conversation = payload;
    },
  },
});

// Exporting actions and reducer for the result slice
export const resultActions = resultSlice.actions;
export default resultSlice.reducer;
