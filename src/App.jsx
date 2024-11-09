import { RouterProvider } from "react-router-dom";
import appRouter from "./app-router";

/**
 * Main Application Component
 *
 * This is the entry point for the app. It:
 * - Renders the `RouterProvider` to handle routing based on the app's configuration (defined in `appRouter`).
 *
 * @returns {JSX.Element} The rendered component.
 */
const App = () => {
  return (
    <main>
      {/* RouterProvider is used to provide routing functionality to the app using the defined appRouter */}
      <RouterProvider router={appRouter} />
    </main>
  );
};

App.displayName = "App";
export default App;
