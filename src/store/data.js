import { createSlice } from "@reduxjs/toolkit";
import { transformData } from "../utilities";

const initialState = {
  candidates: [],
  filteredCandidates: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    replaceCandidates(state, { payload }) {
      state.candidates = transformData(payload);
    },
    replaceFilteredCandidates(state, { payload }) {
      state.filteredCandidates = transformData(payload);
    },
    updateCandidate(state, { payload }) {
      const [updatedCandidate] = transformData([payload]);
      state.filteredCandidates = state.filteredCandidates.map((candidate) =>
        candidate.id === updatedCandidate.id
          ? { ...candidate, ...updatedCandidate }
          : candidate
      );
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
