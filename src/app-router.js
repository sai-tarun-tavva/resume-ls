import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Candidates from "./components/CandidatesHub/Candidates";
import CandidateForm from "./components/CandidatesHub/CandidateForm";

const appRouter = createBrowserRouter([
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

export default appRouter;
