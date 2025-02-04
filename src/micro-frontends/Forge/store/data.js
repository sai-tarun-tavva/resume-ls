import { createSlice } from "@reduxjs/toolkit";

// Initial state for the data slice
const initialState = {
  records: [], // List of records
};

/**
 * DataSlice handles the records.
 * It is responsible for storing the list of records and any related operations such as replacing the records list.
 */
const DataSlice = createSlice({
  name: "input", // The name of the slice
  initialState, // Initial state of the slice
  reducers: {
    /**
     * Replaces the current list of records with new data.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {Array} action.payload.records - List of record objects.
     * @param {string} action.payload.count - Total count of records.
     */
    replaceRecords(state, { payload: { records } }) {
      // Update the list of records
      state.records = records;
    },

    /**
     * Replaces an existing record with a new record object in the records list.
     *
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The dispatched action with payload data.
     * @param {Object} action.payload - The dispatched action containing the updated record data.
     */
    replaceRecord(state, { payload }) {
      // Find the index of the record in the list by matching the ID
      const recordIndex = state.records.findIndex(
        (existingRecord) => existingRecord.id === payload.id
      );

      // If the record is found, replace it with the new record data
      if (recordIndex !== -1) {
        state.records[recordIndex] = payload;
      }
    },
  },
});

// Export actions and reducer for use in the store
export const dataActions = DataSlice.actions;
export default DataSlice.reducer;
