import { createSlice } from "@reduxjs/toolkit";

// Initial state for the data slice
const initialState = {
  count: "", // The total count of candidates
  candidates: [], // List of candidates
};

/**
 * DataSlice handles the candidates data.
 * It is responsible for storing the list of candidates and any related operations such as replacing the candidate list.
 */
const DataSlice = createSlice({
  name: "input", // The name of the slice
  initialState, // Initial state of the slice
  reducers: {
    /**
     * Replaces the current list of candidates with new data.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {Array} action.payload.candidates - List of candidate objects.
     * @param {string} action.payload.count - Total count of candidates.
     */
    replaceCandidates(state, { payload: { count = "", candidates } }) {
      // Update the list of candidates
      state.candidates = candidates.map((candidate) => {
        const newCandidate = { ...candidate }; // Clone the candidate object
        newCandidate.additional_info.record.id = candidate.id; // Add candidate ID to the record
        return newCandidate; // Return the updated candidate
      });
    },

    /**
     * Replaces an existing candidate with a new candidate object in the candidates list.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {Object} action.payload - The dispatched action containing the updated candidate data.
     */
    replaceCandidate(state, { payload }) {
      // Find the index of the candidate in the list by matching the ID
      const candidateIndex = state.candidates.findIndex(
        (existingCandidate) => existingCandidate.id === payload.id
      );

      // If the candidate is found, replace it with the new candidate data
      if (candidateIndex !== -1) {
        state.candidates[candidateIndex] = payload;
      }
    },
  },
});

// Export actions and reducer for use in the store
export const dataActions = DataSlice.actions;
export default DataSlice.reducer;
