import React, { useState } from "react";
import Operations from "./components/Operations";
import Candidates from "./components/Candidates";
import { data as initialData } from "./sample";
import "./App.css";

/**
 * Main application component
 * Handles state for pagination and data filtering, and renders child components.
 * @returns {JSX.Element} The rendered component.
 */
const App = () => {
  // State to track the starting index for the data display
  const [startIndex, setStartIndex] = useState(0);
  // State to hold the filtered data
  const [filteredData, setFilteredData] = useState(initialData);

  /**
   * Updates the starting index for data display.
   * @param {number} index - The new starting index.
   */
  const handleStartIndexChange = (index) => {
    setStartIndex(index);
  };

  /**
   * Updates the filtered data based on filtering criteria.
   * @param {Array} data - The new filtered data.
   */
  const handleFilteredDataChange = (data) => {
    setFilteredData(data);
    setStartIndex(0);
  };

  return (
    <div className="app-container">
      {/* Operations component for filtering and index management */}
      <Operations
        startIndex={startIndex}
        filteredData={filteredData}
        onFilteredDataChange={handleFilteredDataChange}
        onStartIndexChange={handleStartIndexChange}
      />
      {/* Component to display the filtered data */}
      <Candidates startIndex={startIndex} data={filteredData} />
    </div>
  );
};

App.displayName = "App";
export default App;
