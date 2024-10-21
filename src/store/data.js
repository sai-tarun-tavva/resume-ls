import { createSlice } from "@reduxjs/toolkit";
import { transformData } from "../utilities";

// Initial state of the slice
const initialState = {
  candidates: [], // candidates fetched from backend
  skills: [], // skills fetched from backend
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
    // Replaces skills in the state
    replaceSkills(state, { payload }) {
      state.skills = payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
