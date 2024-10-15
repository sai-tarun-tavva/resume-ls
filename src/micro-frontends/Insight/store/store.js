import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data";
import uiReducer from "./ui";
import viewResumeReducer from "./viewresume";

// Combining all reducers into a single reducer object
const reducer = {
  data: dataReducer, // Handles candidate data
  ui: uiReducer, // Handles UI state (e.g., modals, notifications)
  viewResume: viewResumeReducer, // Handles resume viewer state
};

// Configuring the Redux store with the combined reducer
const store = configureStore({
  reducer,
});

export default store;
