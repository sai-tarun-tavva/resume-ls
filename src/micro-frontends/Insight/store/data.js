import { createSlice } from "@reduxjs/toolkit";
import { transformData } from "../../../utilities";

// Initial state of the slice
const initialState = {
  candidates: [], // candidates fetched from backend
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
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
