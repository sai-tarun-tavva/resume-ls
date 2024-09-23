import React, { createContext, useEffect, useReducer } from "react";
import { data as sampleData } from "../sample";

const initialData = {
  startIndex: 0,
  candidateData: [],
};

export const DataContext = createContext(initialData);

const dataReducer = (state, action) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};

const DataContextProvider = ({ children }) => {
  const [data, dataDispatch] = useReducer(dataReducer, initialData);

  /**
   * Updates the starting index for data display.
   * @param {number} index - The new starting index.
   */
  const handleStartIndexChange = (index) => {
    dataDispatch({ type: "startIndex", payload: index });
  };

  /**
   * Updates the filtered data based on filtering criteria.
   * @param {Array} data - The new filtered data.
   */
  const handleFilteredDataChange = (data) => {
    dataDispatch({ type: "candidateData", payload: data });
    dataDispatch({ type: "startIndex", payload: 0 }); // Resets statIndex to 0
  };

  // Initialize candidateData with sampleData on page load
  useEffect(() => {
    dataDispatch({ type: "candidateData", payload: sampleData });
  }, []);

  const dataCtx = {
    ...data,
    onStartIndexChange: handleStartIndexChange,
    onFilteredDataChange: handleFilteredDataChange,
  };

  return (
    <DataContext.Provider value={dataCtx}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
