import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loading";
import statusReducer from "./status";

// Combining all reducers into a single reducer object
const reducer = {
  loading: loadingReducer, // Manages loading state
  status: statusReducer, // Manages status messages and dark mode
};

// Configuring the Redux store with the combined reducer
const store = configureStore({
  reducer,
});

export default store;
