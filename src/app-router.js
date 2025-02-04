import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ROUTES } from "./constants";

// Lazy-loaded components for different pages and sections
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

const Quest = React.lazy(() => import("./pages/Quest"));

const Forge = React.lazy(() => import("./pages/Forge"));
const ForgeRecords = React.lazy(() =>
  import("./micro-frontends/Forge/components/Records")
);
const ForgeForm = React.lazy(() =>
  import("./micro-frontends/Forge/components/Form")
);
const Nexus = React.lazy(() => import("./pages/Nexus"));

const PageNotFound = React.lazy(() =>
  import("./micro-frontends/Atoms/components/PageNotFound")
);

// Extracting route paths from ROUTES constant
const { COMMON, INSIGHT, ONBOARD, SPARK, QUEST, FORGE, NEXUS } = ROUTES;

/**
 * App Router Configuration
 *
 * Defines all the routes for the application, including lazy-loaded pages
 * and protected routes to ensure that only authenticated users can access certain pages.
 *
 * @returns {Object} The router configuration object with defined paths and components.
 */
const appRouter = createBrowserRouter(
  [
    // Default route - Welcome page
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
        // Insight Candidates Page (Default)
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
        // Insight Candidate Form (Edit)
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
        // Onboard Candidates Page (Default)
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
        // Onboard Candidate Form (New)
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
        // Onboard Candidate Form (View)
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
    // Quest Home Page
    {
      path: QUEST.HOME,
      element: (
        <ProtectedRoute
          element={
            <Suspense>
              <Quest />
            </Suspense>
          }
        />
      ),
    },
    // Forge Home Page
    {
      path: FORGE.HOME,
      element: (
        <ProtectedRoute
          element={
            <Suspense>
              <Forge />
            </Suspense>
          }
        />
      ),
      children: [
        // Sales Records Page
        {
          path: FORGE.SALES.VIEW,
          element: (
            <Suspense>
              <ForgeRecords />
            </Suspense>
          ),
        },
        // Sales Record Form (New)
        {
          path: FORGE.SALES.NEW,
          element: (
            <Suspense>
              <ForgeForm />
            </Suspense>
          ),
        },
        // Sales Record Form (Edit)
        {
          path: FORGE.SALES.EDIT,
          element: (
            <Suspense>
              <ForgeForm />
            </Suspense>
          ),
        },
        // Recruit Records Page
        {
          path: FORGE.RECRUIT.VIEW,
          element: (
            <Suspense>
              <ForgeRecords />
            </Suspense>
          ),
        },
        // Recruit Record Form (New)
        {
          path: FORGE.RECRUIT.NEW,
          element: (
            <Suspense>
              <ForgeForm />
            </Suspense>
          ),
        },
        // Recruit Record Form (Edit)
        {
          path: FORGE.RECRUIT.EDIT,
          element: (
            <Suspense>
              <ForgeForm />
            </Suspense>
          ),
        },
      ],
    },
    // Nexus Home Page
    {
      path: NEXUS.HOME,
      element: (
        <ProtectedRoute
          element={
            <Suspense>
              <Nexus />
            </Suspense>
          }
        />
      ),
    },
    // Specific route for /not-found
    {
      path: COMMON.NOT_FOUND,
      element: (
        <Suspense>
          <PageNotFound />
        </Suspense>
      ),
    },
    // Not Found Page (404)
    {
      path: "*",
      element: (
        <Suspense>
          <PageNotFound />
        </Suspense>
      ),
    },
  ],
  {
    future: {
      v7_fetcherPersist: true, // Opt-in to new fetcher behavior
      v7_startTransition: true, // Wrap state updates in React.startTransition
      v7_relativeSplatPath: true, // Updated relative splat path resolution
      v7_normalizeFormMethod: true, // Normalize formMethod fields to uppercase
      v7_partialHydration: true, // New RouterProvider hydration behavior
      v7_skipActionErrorRevalidation: true, // Skip revalidation on 4xx/5xx action errors
    },
  }
);

export default appRouter;
