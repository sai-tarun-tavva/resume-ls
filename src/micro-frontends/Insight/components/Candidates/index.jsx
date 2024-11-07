import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Candidate from "./Candidate";
import NoRecords from "../../../Atoms/components/NoRecords";
import Loader from "../../../Atoms/components/Loader";
import ResumeViewer from "../ResumeViewer";
import { dataActions, uiActions, viewResumeActions } from "../../store";
import { useLoading, useStatus } from "../../../../store";
import {
  buildFetchCandidatesUrl,
  fetchCandidates,
  fetchPdf,
} from "../../../../utilities";
import {
  CONTENT,
  END_POINTS,
  INSIGHT,
  LOADING_ACTION_TYPES,
  STATUS_CODES,
} from "../../../../constants";
import classes from "./index.module.scss";

let isInitial = true;
const { CANDIDATES_PER_PAGE, RESUME_VIEWER_WIDTH_START } = INSIGHT;
const { APP } = LOADING_ACTION_TYPES;

/**
 * InsightCandidates Component
 *
 * Fetches and displays candidate information.
 *
 * @returns {JSX.Element} The rendered InsightCandidates component.
 */
const InsightCandidates = () => {
  const dispatch = useDispatch();
  const { candidates } = useSelector((state) => state.data);
  const { refetch, refetchURL } = useSelector((state) => state.ui);
  const { show: showResume, id: displayResumeId } = useSelector(
    (state) => state.viewResume
  );
  const {
    isLoading,
    enableAppLoading,
    disableAppLoading,
    enableFetchLoading,
    disableFetchLoading,
  } = useLoading();
  const { updateStatus } = useStatus();
  const [pdfDetails, setPdfDetails] = useState({
    name: "",
    size: "",
    url: "",
    isPdf: true,
  });
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth < RESUME_VIEWER_WIDTH_START
  );
  const showResumeRef = useRef(showResume);

  useEffect(() => {
    /**
     * Update ref value whenever showResume changes
     */
    showResumeRef.current = showResume;
  }, [showResume]);

  useEffect(() => {
    /**
     * Fetch candidates and update redux state.
     */
    const url =
      refetchURL ||
      buildFetchCandidatesUrl(
        END_POINTS.INSIGHT.FETCH_CANDIDATES,
        CANDIDATES_PER_PAGE
      );

    const getData = async () => {
      enableAppLoading();

      const { status, data } = await fetchCandidates(url);

      if (status === STATUS_CODES.SUCCESS) {
        const {
          count: totalCount,
          previous: previousPage,
          next: nextPage,
          results: candidates,
        } = data;

        dispatch(dataActions.replaceCandidates(candidates));
        dispatch(
          uiActions.updatePagination({
            previousPage,
            nextPage,
            totalCount,
          })
        );
      } else {
        updateStatus({
          message: CONTENT.COMMON.serverError,
          type: "failure",
        });
      }
      disableAppLoading();
    };

    if (isInitial || refetch) {
      isInitial = false;
      getData();
      dispatch(uiActions.disableRefetch());
    }
  }, [
    dispatch,
    refetch,
    refetchURL,
    enableAppLoading,
    disableAppLoading,
    updateStatus,
  ]);

  useEffect(() => {
    /**
     * Update resume id to be shown when candidates loaded and resume viewer open
     */
    if (showResumeRef.current && candidates?.length > 0) {
      dispatch(viewResumeActions.updateId(candidates[0].id));
    }
  }, [candidates, dispatch, showResumeRef]);

  useEffect(() => {
    /**
     * Fetch resume pdf and update redux state.
     */
    const getPdf = async () => {
      enableFetchLoading();
      const { status, data } = await fetchPdf(displayResumeId);
      disableFetchLoading();

      if (status === STATUS_CODES.SUCCESS) {
        setPdfDetails(data);
      } else {
        dispatch(viewResumeActions.hideResume());
        dispatch(viewResumeActions.updateId(null));
        updateStatus({
          message: CONTENT.COMMON.serverError,
          type: "failure",
        });
      }
    };

    if (displayResumeId) getPdf();
  }, [
    dispatch,
    displayResumeId,
    enableFetchLoading,
    disableFetchLoading,
    updateStatus,
  ]);

  useEffect(() => {
    // Update the state on window resize
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < RESUME_VIEWER_WIDTH_START);
    };

    // Check on initial render and set isSmallScreen
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className={`${classes.cards} ${
        showResume && !isSmallScreen && classes.smaller
      }`}
    >
      {isLoading[APP] ? (
        <Loader />
      ) : candidates.length === 0 ? (
        <NoRecords />
      ) : (
        <Fragment>
          {candidates.map((candidate) => (
            <Candidate
              key={candidate.id}
              candidate={candidate}
              openResumeInNewTab={isSmallScreen}
            />
          ))}
          {showResume && !isSmallScreen && (
            <ResumeViewer details={pdfDetails} />
          )}
        </Fragment>
      )}
    </section>
  );
};

InsightCandidates.displayName = "InsightCandidates";
export default InsightCandidates;
