import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data";
import resultReducer from "./result";

// Combining reducers into a single reducer object
const reducer = {
  data: dataReducer, // Manages user input data
  result: resultReducer, // Manages results from API responses
};

// Configuring the Redux store with the combined reducers
const store = configureStore({
  reducer: reducer,
});

// Exporting the configured store
export default store;
