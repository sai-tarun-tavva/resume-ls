import { RouterProvider } from "react-router-dom";
import appRouter from "./app-router";
import { DataContextProvider, LoadingContextProvider } from "./store";

/**
 * Main application component
 * Handles state for pagination and data filtering, and renders child components.
 * @returns {JSX.Element} The rendered component.
 */
const App = () => {
  return (
    <LoadingContextProvider>
      <DataContextProvider>
        <main>
          <RouterProvider router={appRouter} />
        </main>
      </DataContextProvider>
    </LoadingContextProvider>
  );
};

App.displayName = "App";
export default App;
