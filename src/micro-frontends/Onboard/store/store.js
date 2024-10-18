import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./input";

// Combining all reducers into a single reducer object
const reducer = {
  input: inputReducer, // Handles candidate form input
};

// Configuring the Redux store with the combined reducer
const store = configureStore({
  reducer,
});

export default store;
