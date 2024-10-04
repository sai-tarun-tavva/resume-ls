import { createSlice } from "@reduxjs/toolkit";

// Initial state for the UI slice
const initialState = {
  startIndex: 0, // Index indicating the start of a list or pagination
  shouldRefetch: false, // Flag to determine if data should be refetched
  searchTerm: "", // Term to search for and filter the candidates
};

// Creating the UI slice
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Updates the start index value in the state
    updateStartIndex(state, { payload }) {
      state.startIndex = payload;
    },
    // Updates the refetch flag in the state
    updateShouldRefetch(state, { payload }) {
      state.shouldRefetch = payload;
    },
    // Updates the search term in the state
    updateSearchTerm(state, { payload }) {
      state.searchTerm = payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
