import { createSlice } from "@reduxjs/toolkit";
import { transformData } from "../../../utilities";

// Initial state of the slice
const initialState = {
  candidates: [], // candidates fetched from backend
  skills: [], // skills fetched from backend
};

/**
 * Data slice to manage candidate and skill data within the Redux store.
 * Provides actions to replace candidates and skills in the state.
 */
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    /**
     * Replaces the candidates array in the state with transformed data.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action containing payload data.
     * @param {Array} action.payload - The new candidates data to set in the state.
     */
    replaceCandidates(state, { payload }) {
      // Transform and set the new candidates array
      state.candidates = transformData(payload);
    },

    /**
     * Replaces the skills array in the state.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action containing payload data.
     * @param {Array} action.payload - The new skills data to set in the state.
     */
    replaceSkills(state, { payload }) {
      state.skills = payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;
