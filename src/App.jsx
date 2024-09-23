import React from "react";
import Operations from "./components/Operations";
import Candidates from "./components/Candidates";
import DataContextProvider from "./store/DataContextProvider";
import "./App.css";

/**
 * Main application component
 * Handles state for pagination and data filtering, and renders child components.
 * @returns {JSX.Element} The rendered component.
 */
const App = () => {
  return (
    <DataContextProvider>
      <main className="app-container">
        {/* Operations component for filtering and index management */}
        <Operations />
        {/* Component to display the filtered data */}
        <Candidates />
      </main>
    </DataContextProvider>
  );
};

App.displayName = "App";
export default App;
