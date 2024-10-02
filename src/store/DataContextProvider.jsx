import { createContext, useCallback, useReducer, useMemo } from "react";
import { transformData } from "../utilities";

const initialData = {
  startIndex: 0,
  shouldRefetch: false,
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
      const existingCandidatesData = state.candidateData;
      return {
        ...state,
        candidateData: existingCandidatesData.map((candidate) =>
          candidate.id === updatedCandidate.id
            ? { ...candidate, ...updatedCandidate }
            : candidate
        ),
      };

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
  const handleStartIndexChange = useCallback(
    (index) => {
      dataDispatch({ type: "startIndex", payload: index });
    },
    [dataDispatch]
  );

  const handleDataChange = useCallback(
    (data) => {
      dataDispatch({
        type: "candidateData",
        payload: transformData(data),
      });
    },
    [dataDispatch] // Only recreate if dataDispatch changes
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
    [dataDispatch] // Only recreate if dataDispatch changes
  );

  const handleUpdateSingleDataItem = useCallback(
    (data) => {
      dataDispatch({ type: "candidate", payload: transformData([data]) });
    },
    [dataDispatch]
  );

  const handleShouldRefetch = useCallback(
    (data) => {
      dataDispatch({ type: "shouldRefetch", payload: data });
    },
    [dataDispatch]
  );

  // Memoize the context value to prevent unnecessary re-renders
  const dataCtx = useMemo(
    () => ({
      ...data,
      onStartIndexChange: handleStartIndexChange,
      onDataChange: handleDataChange,
      onFilteredDataChange: handleFilteredDataChange,
      onUpdateSingleDataItem: handleUpdateSingleDataItem,
      setShouldRefetch: handleShouldRefetch,
    }),
    [
      data,
      handleStartIndexChange,
      handleDataChange,
      handleFilteredDataChange,
      handleUpdateSingleDataItem,
      handleShouldRefetch,
    ]
  );

  return (
    <DataContext.Provider value={dataCtx}>{children}</DataContext.Provider>
  );
};
