import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data";
import loadingReducer from "./loading";
import statusReducer from "./status";
import uiReducer from "./ui";

const reducer = {
  data: dataReducer,
  loading: loadingReducer,
  status: statusReducer,
  ui: uiReducer,
};

const store = configureStore({
  reducer,
});

export default store;
