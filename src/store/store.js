import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data";
import loadingReducer from "./loading";
import statusReducer from "./status";
import uiReducer from "./ui";
import viewResumeReducer from "./viewresume";

// Combining all reducers into a single reducer object
const reducer = {
  data: dataReducer, // Handles candidate data
  loading: loadingReducer, // Manages loading state
  status: statusReducer, // Manages status messages and dark mode
  ui: uiReducer, // Handles UI state (e.g., modals, notifications)
  viewResume: viewResumeReducer, // Handles resume viewer state
};

// Configuring the Redux store with the combined reducer
const store = configureStore({
  reducer,
});

export default store;
