import { createSlice } from "@reduxjs/toolkit";

// Initial state for the UI slice
const initialState = {
  previousPage: "", // Page number to fetch previous set of candidates
  nextPage: "", // Page number to fetch next set of candidates
  totalCount: 0, // Total number of candidates
  searchTerm: "", // Term to search for and filter the candidates
  refetch: false, // Flag to determine whether to re-fetch the candidates
  refetchURL: "", // URL to refetch corresponding set of candidates
};

/**
 * UI slice for managing UI-related state such as pagination, search terms, and refetching.
 */
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    /**
     * Updates the search term in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action containing payload data.
     * @param {string} action.payload - The new search term to update.
     */
    updateSearchTerm(state, { payload }) {
      state.searchTerm = payload;
    },

    /**
     * Updates pagination details in the state, including previous and next pages and total count.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action containing payload data.
     * @param {Object} action.payload - Pagination data to update in the state.
     * @param {string} action.payload.previousPage - The page number for previous results.
     * @param {string} action.payload.nextPage - The page number for next results.
     * @param {number} action.payload.totalCount - The total number of candidates.
     */
    updatePagination(
      state,
      { payload: { previousPage, nextPage, totalCount } }
    ) {
      state.previousPage = previousPage;
      state.nextPage = nextPage;
      state.totalCount = totalCount;
    },

    /**
     * Updates the refetch URL in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action containing the URL.
     * @param {string} action.payload - The new URL to set for refetching.
     */
    updateRefetchURL(state, { payload }) {
      state.refetchURL = payload;
    },

    /**
     * Enables the refetch flag in the state, allowing a new data fetch.
     *
     * @param {Object} state - The current state of the slice.
     */
    enableRefetch(state) {
      state.refetch = true;
    },

    /**
     * Disables the refetch flag in the state, preventing additional data fetches.
     *
     * @param {Object} state - The current state of the slice.
     */
    disableRefetch(state) {
      state.refetch = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
