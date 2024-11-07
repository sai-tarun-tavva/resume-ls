import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: "",
  candidates: [],
};

const DataSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    // Update fields
    replaceCandidates(state, { payload: { count = "", candidates } }) {
      //   state.count = count;
      state.candidates = candidates.map((candidate) => {
        const newCandidate = { ...candidate };
        newCandidate.additional_info.record.id = candidate.id;
        return newCandidate;
      });
    },
  },
});

export const dataActions = DataSlice.actions;
export default DataSlice.reducer;
