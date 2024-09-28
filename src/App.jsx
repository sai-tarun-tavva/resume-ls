import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Candidates from "./components/CandidatesHub/Candidates";
import CandidateForm from "./components/CandidatesHub/CandidateForm";
import LoadingContextProvider from "./store/LoadingContextProvider";
import DataContextProvider from "./store/DataContextProvider";
import "./App.css";

const router = createBrowserRouter([
  { path: "", element: <Login /> },
  {
    path: "candidates",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Candidates />,
      },
      { path: "edit/:candidateId", element: <CandidateForm /> },
    ],
  },
]);

/**
 * Main application component
 * Handles state for pagination and data filtering, and renders child components.
 * @returns {JSX.Element} The rendered component.
 */
const App = () => {
  return (
    <LoadingContextProvider>
      <DataContextProvider>
        <main className="app-container">
          <RouterProvider router={router} />
        </main>
      </DataContextProvider>
    </LoadingContextProvider>
  );
};

App.displayName = "App";
export default App;
