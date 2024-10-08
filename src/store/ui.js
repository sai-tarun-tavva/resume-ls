import { createSlice } from "@reduxjs/toolkit";

// Initial state for the UI slice
const initialState = {
  previousURL: "", // URL to fetch previous set of candidates
  nextURL: "", // URL to fetch next set of candidates
  totalCount: 0, // Total number of candidates
  searchTerm: "", // Term to search for and filter the candidates
  refetch: false, // Flag to determine whether to re-fetch the candidates
  refetchURL: "", // URL to refetch corresponding set of candidates
};

// Creating the UI slice
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Updates the search term in the state
    updateSearchTerm(state, { payload }) {
      state.searchTerm = payload;
    },
    // Updates the previousURL, nextURL, totalCount in the state
    updatePagination(state, { payload: { previousURL, nextURL, totalCount } }) {
      state.previousURL = previousURL;
      state.nextURL = nextURL;
      state.totalCount = totalCount;
    },
    // Updates the refetchURL in the state
    updateRefetchURL(state, { payload }) {
      state.refetchURL = payload;
    },
    // Enables the refetch in the state
    enableRefetch(state) {
      state.refetch = true;
    },
    // Disables the refetch in the state
    disableRefetch(state) {
      state.refetch = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
