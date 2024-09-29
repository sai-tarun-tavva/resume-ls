import { createContext, useCallback, useReducer } from "react";
import { transformData } from "../utilities";

const initialData = {
  startIndex: 0,
  candidateData: [],
  filteredCandidateData: [],
};

export const DataContext = createContext(initialData);

const dataReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "candidate":
      const [updatedCandidate] = payload;
      // Find and update a specific candidate in the candidateData array
      const updatedCandidatesData = state.candidateData.map((candidate) =>
        candidate.id === updatedCandidate.id
          ? { ...candidate, ...updatedCandidate }
          : candidate
      );
      return { ...state, candidateData: updatedCandidatesData };

    default:
      return { ...state, [type]: payload };
  }
};

export const DataContextProvider = ({ children }) => {
  const [data, dataDispatch] = useReducer(dataReducer, initialData);

  /**
   * Updates the starting index for data display.
   * @param {number} index - The new starting index.
   */
  const handleStartIndexChange = (index) => {
    dataDispatch({ type: "startIndex", payload: index });
  };

  const handleDataChange = useCallback(
    (data) => {
      dataDispatch({
        type: "candidateData",
        payload: transformData(data),
      });
    },
    [dataDispatch] // Dependency array, only recreate if dataDispatch changes
  );

  /**
   * Updates the filtered data based on filtering criteria.
   * @param {Array} data - The new filtered data.
   */
  const handleFilteredDataChange = useCallback(
    (data) => {
      dataDispatch({
        type: "filteredCandidateData",
        payload: transformData(data),
      });
      dataDispatch({ type: "startIndex", payload: 0 }); // Resets startIndex to 0
    },
    [dataDispatch] // Dependency array, only recreate if dataDispatch changes
  );

  const handleUpdateSingleDataItem = (data) => {
    dataDispatch({ type: "candidate", payload: transformData([data]) });
  };

  const dataCtx = {
    ...data,
    onStartIndexChange: handleStartIndexChange,
    onDataChange: handleDataChange,
    onFilteredDataChange: handleFilteredDataChange,
    onUpdateSingleDataItem: handleUpdateSingleDataItem,
  };

  return (
    <DataContext.Provider value={dataCtx}>{children}</DataContext.Provider>
  );
};
