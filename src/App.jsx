import React from "react";
import Home from "./components/Pages/Home";
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
        <Home />
      </main>
    </DataContextProvider>
  );
};

App.displayName = "App";
export default App;
