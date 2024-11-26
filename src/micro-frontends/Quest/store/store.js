import { configureStore } from "@reduxjs/toolkit";
import resultReducer from "./result";
import { calling, cleanUp, polling } from "../middleware";

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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(polling, calling, cleanUp),
});

// Exporting the configured store
export default store;
