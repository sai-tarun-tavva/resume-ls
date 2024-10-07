import { createSlice } from "@reduxjs/toolkit";

// Initial state for the ViewResume slice
const initialState = {
  show: false, // Flag to determine if resume should be displayed
  id: null, // Candidate ID of the resume file to be displayed
};

// Creating ViewResume Slice
const ViewResumeSlice = createSlice({
  name: "view-resume",
  initialState,
  reducers: {
    // Updates show to true in the state
    showResume(state) {
      state.show = true;
    },
    // Updates show to false in the state
    hideResume(state) {
      state.show = false;
    },
    // Updates ID in the state
    updateId(state, { payload }) {
      state.id = payload;
    },
  },
});

export const viewResumeActions = ViewResumeSlice.actions;
export default ViewResumeSlice.reducer;
