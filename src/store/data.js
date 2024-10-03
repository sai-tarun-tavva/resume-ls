import { createSlice } from "@reduxjs/toolkit";
import { transformData } from "../utilities";

// Initial state of the slice
const initialState = {
  candidates: [], // candidates fetched from backend
  filteredCandidates: [], // filtered candidates after filtering with search key
};

// Creating the data slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Replaces candidates in the state with transformed data
    replaceCandidates(state, { payload }) {
      // Transform and set the new candidates array
      state.candidates = transformData(payload);
    },
    // Replaces filtered candidates in the state with transformed data
    replaceFilteredCandidates(state, { payload }) {
      // Transform and set the new filtered candidates array
      state.filteredCandidates = transformData(payload);
    },
    // Updates an existing candidate in the filtered candidates list
    updateCandidate(state, { payload }) {
      // Transform the single candidate payload for uniformity
      const [updatedCandidate] = transformData([payload]);

      // Update the filteredCandidates array with the updated candidate
      state.filteredCandidates = state.filteredCandidates.map((candidate) =>
        candidate.id === updatedCandidate.id
          ? { ...candidate, ...updatedCandidate } // Merge existing candidate data with updated data
          : candidate
      );
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
