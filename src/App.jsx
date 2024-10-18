import { RouterProvider } from "react-router-dom";
import appRouter from "./app-router";

/**
 * Main application component
 * Handles state for pagination and data filtering, and renders child components.
 * @returns {JSX.Element} The rendered component.
 */
const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
};

App.displayName = "App";
export default App;
