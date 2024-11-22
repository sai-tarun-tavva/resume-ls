import { createSlice } from "@reduxjs/toolkit";

// Initial state for the results slice
const initialState = {
  questions: [],
  conversation: {},
  sessionID: "",
};

/**
 * Results slice for managing and displaying results related to candidate interview.
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

    /**
     * Updates the sessionID in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {string} action.payload - The new session ID.
     */
    updateSessionID(state, { payload }) {
      state.sessionID = payload;
    },
  },
});

// Exporting actions and reducer for the result slice
export const resultActions = resultSlice.actions;
export default resultSlice.reducer;
