import { configureStore } from "@reduxjs/toolkit";
import resultReducer from "./result";

// Combining reducers into a single reducer object
const reducer = {
  result: resultReducer, // Manages results from API responses
};

/**
 * Configures the Redux store with combined reducers for data and result management.
 *
 * @type {Store} The configured Redux store instance.
 * @property {Reducer} result - Reducer managing API response results.
 */
const store = configureStore({
  reducer: reducer,
});

// Exporting the configured store
export default store;
