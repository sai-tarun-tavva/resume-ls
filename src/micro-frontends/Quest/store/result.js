import { createSlice } from "@reduxjs/toolkit";

// Initial state for the results slice
const initialState = {
  /**
   * @property {Array} questions - Stores the list of questions generated based on the job description.
   * This will be used to display the questions to the user.
   */
  questions: [],

  /**
   * @property {Object} conversation - Represents the conversation data between the user and the AI.
   * Each key-value pair holds user inputs and corresponding AI responses.
   */
  conversation: {},

  /**
   * @property {string} sessionID - A unique identifier for the current session.
   * Used for tracking the session during API calls and polling.
   */
  sessionID: "",

  /**
   * @property {boolean} isCalling - Indicates whether the system is in the "Calling" phase.
   * True when the call is in progress, and false once the call is connected or ends.
   */
  isCalling: true,

  /**
   * @property {number} callDuration - Tracks the duration of the call in seconds.
   * This value increments during the call and resets when the call ends.
   */
  callDuration: 0,

  /**
   * @property {string} jobDescription - Contains the job description entered by the user.
   * Used to generate relevant interview questions.
   */
  jobDescription: "",

  /**
   * @property {string} phoneNumber - Stores the phone number entered by the user.
   * Used to initiate and track the call session.
   */
  phoneNumber: "",

  /**
   * @property {number} failureCount - Tracks the number of consecutive polling failures.
   * If the failure count exceeds a defined threshold, polling will stop, and an error will be displayed.
   */
  failureCount: 0,

  /**
   * @property {number} callStatus - Tracks the status of the call.
   * Used to determine if the call has been initiated and completed/canceled
   */
  callStatus: "",
};

/**
 * Results slice for managing and displaying results related to candidate interview.
 */
const resultSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    startPolling: (state) => state, // No-op action to trigger middleware
    stopPolling: (state) => state, // No-op action to stop polling

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

    /**
     * Toggles the calling state (isCalling).
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {boolean} action.payload - The new calling state.
     */
    updateIsCalling(state, { payload }) {
      state.isCalling = payload;
    },

    /**
     * Updates the call duration.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {number} action.payload - The new call duration in seconds.
     */
    updateCallDuration(state, { payload }) {
      state.callDuration = payload;
    },

    /**
     * Updates the job description in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {string} action.payload - The new job description.
     */
    updateJobDescription(state, { payload }) {
      state.jobDescription = payload;
    },

    /**
     * Updates the phone number in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {string} action.payload - The new phone number.
     */
    updatePhoneNumber(state, { payload }) {
      state.phoneNumber = payload;
    },

    /**
     * Updates the failure count in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {string} action.payload - The new failure count.
     */
    updateFailureCount(state, { payload }) {
      state.failureCount = payload;
    },

    /**
     * Updates the call status in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {string} action.payload - The new call status.
     */
    updateCallStatus(state, { payload }) {
      state.callStatus = payload;
    },

    /**
     * Resets the call state to its initial values.
     *
     * @param {Object} state - The current state of the slice.
     */
    resetState(state) {
      return { ...initialState, jobDescription: state.jobDescription };
    },
  },
});

// Exporting actions and reducer for the result slice
export const resultActions = resultSlice.actions;
export default resultSlice.reducer;
