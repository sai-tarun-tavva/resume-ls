import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Candidates from "./components/CandidatesHub/Candidates";
import CandidateForm from "./components/CandidatesHub/CandidateForm";
import PageNotFound from "./components/Atoms/PageNotFound";
import { ROUTES } from "./constants";

/**
 * Router configuration for the application.
 * Defines routes for the application, including home, login, candidate forms, and a catch-all for 404 pages.
 * @returns {Object} The router configuration object.
 */
const appRouter = createBrowserRouter([
  { path: "", element: <Navigate to={ROUTES.AUTH} /> }, // pending to change based on auth
  { path: ROUTES.AUTH, element: <Login /> },
  {
    path: ROUTES.HOME,
    element: <Home />,
    children: [
      { index: true, element: <Candidates /> },
      { path: ROUTES.CANDIDATE_FORM, element: <CandidateForm /> },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);

export default appRouter;
