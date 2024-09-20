import React, { useState } from "react";
import "./App.css";
import Operations from "./components/Operations";
import Table from "./components/Table";
import { data as initialData } from "./sample";

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
      {/* Table component to display the filtered data */}
      <Table startIndex={startIndex} data={filteredData} />
    </div>
  );
};

App.displayName = "App";
export default App;
