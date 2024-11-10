import { createSlice } from "@reduxjs/toolkit";

// Initial state for the ViewResume slice
const initialState = {
  show: false, // Flag to determine if resume should be displayed
  id: null, // Candidate ID of the resume file to be displayed
};

/**
 * ViewResume slice for managing the visibility and selected resume ID in the UI.
 */
const ViewResumeSlice = createSlice({
  name: "view-resume",
  initialState,
  reducers: {
    /**
     * Sets the `show` flag to true, indicating the resume should be displayed.
     *
     * @param {Object} state - The current state of the slice.
     */
    showResume(state) {
      state.show = true;
    },

    /**
     * Sets the `show` flag to false, hiding the resume from view.
     *
     * @param {Object} state - The current state of the slice.
     */
    hideResume(state) {
      state.show = false;
    },

    /**
     * Updates the `id` in the state to the specified candidate ID.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action containing the candidate ID.
     * @param {string | null} action.payload - The candidate ID to display, or null to clear.
     */
    updateId(state, { payload }) {
      state.id = payload;
    },
  },
});

export const viewResumeActions = ViewResumeSlice.actions;
export default ViewResumeSlice.reducer;
