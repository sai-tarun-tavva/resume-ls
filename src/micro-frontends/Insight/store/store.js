import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data";
import uiReducer from "./ui";
import viewResumeReducer from "./viewresume";

/**
 * Root reducer combining individual slice reducers to manage various aspects of the application state.
 *
 * - data: Manages candidate and skill data.
 * - ui: Manages UI-related states, such as modals and notifications.
 * - viewResume: Manages state related to viewing resumes.
 */
const reducer = {
  data: dataReducer, // Manages candidate and skill data
  ui: uiReducer, // Manages UI state (e.g., modals, notifications)
  viewResume: viewResumeReducer, // Manages resume viewer state
};

/**
 * Configures and creates the Redux store with the combined reducers, providing
 * a single source of truth for application state.
 *
 * @returns {Store} The configured Redux store instance.
 */
const store = configureStore({
  reducer,
});

export default store;
