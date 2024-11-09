import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data";
import resultReducer from "./result";

// Combining reducers into a single reducer object
const reducer = {
  data: dataReducer, // Manages user input data
  result: resultReducer, // Manages results from API responses
};

/**
 * Configures the Redux store with combined reducers for data and result management.
 *
 * @type {Store} The configured Redux store instance.
 * @property {Reducer} data - Reducer managing user input data.
 * @property {Reducer} result - Reducer managing API response results.
 */
const store = configureStore({
  reducer: reducer,
});

// Exporting the configured store
export default store;
