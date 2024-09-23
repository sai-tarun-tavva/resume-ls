import React, { createContext, useEffect, useReducer } from "react";
import { data as sampleData } from "../sample";

const initialData = {
  startIndex: 0,
  candidateData: [],
};

export const DataContext = createContext(initialData);

const dataReducer = (state, action) => {
  switch (action.type) {
    case "index":
      return { ...state, startIndex: action.payload };
    case "data":
      return { ...state, candidateData: action.payload };
    default:
      return state;
  }
};

const DataContextProvider = ({ children }) => {
  const [data, dataDispatch] = useReducer(dataReducer, initialData);

  /**
   * Updates the starting index for data display.
   * @param {number} index - The new starting index.
   */
  const handleStartIndexChange = (index) => {
    dataDispatch({ type: "index", payload: index });
  };

  /**
   * Updates the filtered data based on filtering criteria.
   * @param {Array} data - The new filtered data.
   */
  const handleFilteredDataChange = (data) => {
    dataDispatch({ type: "data", payload: data });
    dataDispatch({ type: "index", payload: 0 }); // Resets statIndex to 0
  };

  // Initialize candidateData with sampleData on page load
  useEffect(() => {
    dataDispatch({ type: "data", payload: sampleData });
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
