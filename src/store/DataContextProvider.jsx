import React, { createContext, useEffect, useReducer } from "react";
import { transformSampleData } from "../utilities/index";
import { data as sampleData } from "../sample";

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
  const handleFilteredDataChange = (data) => {
    dataDispatch({ type: "candidateData", payload: transformSampleData(data) });
    dataDispatch({ type: "startIndex", payload: 0 }); // Resets statIndex to 0
  };

  const handleUpdateSingleDataItem = (data) => {
    dataDispatch({ type: "candidate", payload: data });
  };

  // Initialize candidateData with sampleData on page load
  useEffect(() => {
    dataDispatch({
      type: "candidateData",
      payload: transformSampleData(sampleData),
    });
  }, []);

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
