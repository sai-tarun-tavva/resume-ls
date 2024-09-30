import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Candidates from "./components/CandidatesHub/Candidates";
import CandidateForm from "./components/CandidatesHub/CandidateForm";
import { ROUTES } from "./constants";

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
]);

export default appRouter;
