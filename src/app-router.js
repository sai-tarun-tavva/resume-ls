import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import Welcome from "./pages/Welcome";
import Insight from "./pages/Insight";
import Onboard from "./pages/Onboard";
import Candidates from "./micro-frontends/Insight/components/Candidates";
import CandidateForm from "./micro-frontends/Insight/components/CandidateForm";
import PageNotFound from "./micro-frontends/Atoms/components/PageNotFound";
import { ROUTES } from "./constants";

const { INSIGHT, ONBOARD } = ROUTES;

/**
 * Router configuration, defines for the application.
 *
 * @returns {Object} The router configuration object.
 */
const appRouter = createBrowserRouter([
  // Default Welcome page
  { path: "", element: <Welcome /> },
  // Insight Home Page
  {
    path: INSIGHT.HOME,
    element: <ProtectedRoute element={<Insight />} />,
    children: [
      { index: true, element: <Candidates /> },
      { path: INSIGHT.CANDIDATE_FORM, element: <CandidateForm /> },
    ],
  },
  // Onboard Home Page
  {
    path: ONBOARD.HOME,
    element: <ProtectedRoute element={<Onboard />} />,
    children: [
      // { index: true, element: <Candidates /> },
      // { path: INSIGHT.CANDIDATE_FORM, element: <CandidateForm /> },
    ],
  },
  // Not Found Page
  { path: "*", element: <PageNotFound /> },
]);

export default appRouter;
