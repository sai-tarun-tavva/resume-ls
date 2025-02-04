import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data";
import inputReducer from "./input";

/**
 * Combining all reducers into a single reducer object.
 *
 * @type {Object} The reducer object.
 * @property {Reducer} input - Reducer managing record form input.
 * @property {Reducer} data - Reducer managing fetched records.
 */
const reducer = {
  input: inputReducer, // Handles record form input
  data: dataReducer, // Handles fetched records
};

/**
 * Configures the Redux store with the combined reducers for managing input and data.
 *
 * @type {Store} The configured Redux store instance.
 * @property {Reducer} input - Reducer managing record form input.
 * @property {Reducer} data - Reducer managing fetched records.
 */
const store = configureStore({
  reducer,
});

// Exporting the configured store
export default store;
