import React, { createContext, useReducer, useCallback } from "react";
import { transformData } from "../utilities/index";

const initialData = {
  startIndex: 0,
  candidateData: [],
};

export const DataContext = createContext(initialData);

const dataReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "candidate":
      // Find and update a specific candidate in the candidateData array
      const updatedCandidateData = state.candidateData.map((candidate) =>
        candidate.id === payload.id ? { ...candidate, ...payload } : candidate
      );
      return { ...state, candidateData: updatedCandidateData };

    default:
      return { ...state, [type]: payload };
  }
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
  const handleFilteredDataChange = useCallback(
    (data) => {
      dataDispatch({
        type: "candidateData",
        payload: transformData(data),
      });
      dataDispatch({ type: "startIndex", payload: 0 }); // Resets startIndex to 0
    },
    [dataDispatch] // Dependency array, only recreate if dataDispatch changes
  );

  const handleUpdateSingleDataItem = (data) => {
    dataDispatch({ type: "candidate", payload: data });
  };

  const dataCtx = {
    ...data,
    onStartIndexChange: handleStartIndexChange,
    onFilteredDataChange: handleFilteredDataChange,
    onUpdateSingleDataItem: handleUpdateSingleDataItem,
  };

  return (
    <DataContext.Provider value={dataCtx}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
