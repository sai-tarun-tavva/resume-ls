import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ROUTES } from "./constants";

const Welcome = React.lazy(() => import("./pages/Welcome"));

const Insight = React.lazy(() => import("./pages/Insight"));
const InsightCandidates = React.lazy(() =>
  import("./micro-frontends/Insight/components/Candidates")
);
const InsightForm = React.lazy(() =>
  import("./micro-frontends/Insight/components/CandidateForm")
);

const Onboard = React.lazy(() => import("./pages/Onboard"));
const OnboardCandidates = React.lazy(() =>
  import("./micro-frontends/Onboard/components/Candidates")
);
const OnboardForm = React.lazy(() =>
  import("./micro-frontends/Onboard/components/Form")
);

const Spark = React.lazy(() => import("./pages/Spark"));

const PageNotFound = React.lazy(() =>
  import("./micro-frontends/Atoms/components/PageNotFound")
);

const { INSIGHT, ONBOARD, SPARK } = ROUTES;

/**
 * Router configuration, defines for the application.
 *
 * @returns {Object} The router configuration object.
 */
const appRouter = createBrowserRouter([
  // Default Welcome page
  {
    path: "",
    element: (
      <Suspense>
        <Welcome />
      </Suspense>
    ),
  },
  // Insight Home Page
  {
    path: INSIGHT.HOME,
    element: (
      <ProtectedRoute
        element={
          <Suspense>
            <Insight />
          </Suspense>
        }
      />
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute
            element={
              <Suspense>
                <InsightCandidates />
              </Suspense>
            }
          />
        ),
      },
      {
        path: INSIGHT.CANDIDATE_FORM,
        element: (
          <ProtectedRoute
            element={
              <Suspense>
                <InsightForm />
              </Suspense>
            }
          />
        ),
      },
    ],
  },
  // Onboard Home Page
  {
    path: ONBOARD.HOME,
    element: (
      <ProtectedRoute
        element={
          <Suspense>
            <Onboard />
          </Suspense>
        }
      />
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute
            element={
              <Suspense>
                <OnboardCandidates />
              </Suspense>
            }
          />
        ),
      },
      {
        path: ONBOARD.CANDIDATE_FORM.NEW,
        element: (
          <ProtectedRoute
            element={
              <Suspense>
                <OnboardForm />
              </Suspense>
            }
          />
        ),
      },
      {
        path: ONBOARD.CANDIDATE_FORM.VIEW,
        element: (
          <ProtectedRoute
            element={
              <Suspense>
                <OnboardForm />
              </Suspense>
            }
          />
        ),
      },
    ],
  },
  // Spark Home Page
  {
    path: SPARK.HOME,
    element: (
      <ProtectedRoute
        element={
          <Suspense>
            <Spark />
          </Suspense>
        }
      />
    ),
  },
  // Not Found Page
  {
    path: "*",
    element: (
      <Suspense>
        <PageNotFound />
      </Suspense>
    ),
  },
]);

export default appRouter;
