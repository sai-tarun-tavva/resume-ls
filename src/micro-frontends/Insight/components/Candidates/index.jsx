import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Candidate from "./Candidate";
import Loader from "../../../Atoms/components/Loader";
import ResumeViewer from "../ResumeViewer";
import {
  dataActions,
  loadingActions,
  statusActions,
  uiActions,
  viewResumeActions,
} from "../../../../store";
import {
  buildFetchCandidatesUrl,
  fetchCandidates,
  fetchPdf,
} from "../../../../utilities";
import {
  CONTENT,
  CANDIDATES_PER_PAGE,
  STATUS_CODES,
  RESUME_VIEWER_WIDTH_START,
} from "../../../../constants";
import classes from "./index.module.scss";

let isInitial = true;

/**
 * Candidates Component
 *
 * Fetches and displays candidate information.
 *
 * @returns {JSX.Element} The rendered candidates component.
 */
const Candidates = () => {
  const dispatch = useDispatch();
  const { candidates } = useSelector((state) => state.data);
  const { refetch, refetchURL } = useSelector((state) => state.ui);
  const { show: showResume, id: displayResumeId } = useSelector(
    (state) => state.viewResume
  );
  const { isAppLoading: isLoading } = useSelector((state) => state.loading);
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
    const url = refetchURL || buildFetchCandidatesUrl(CANDIDATES_PER_PAGE);

    const getData = async () => {
      dispatch(loadingActions.enableAppLoading());

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
        dispatch(
          statusActions.updateStatus({
            message: CONTENT.serverError,
            type: "failure",
          })
        );
      }
      dispatch(loadingActions.disableAppLoading());
    };

    if (isInitial || refetch) {
      isInitial = false;
      getData();
      dispatch(uiActions.disableRefetch());
    }
  }, [dispatch, refetch, refetchURL]);

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
      dispatch(loadingActions.enableFetchLoading());
      const { status, data } = await fetchPdf(displayResumeId);
      dispatch(loadingActions.disableFetchLoading());

      if (status === STATUS_CODES.SUCCESS) {
        setPdfDetails(data);
      } else {
        dispatch(viewResumeActions.hideResume());
        dispatch(viewResumeActions.updateId(null));
        dispatch(
          statusActions.updateStatus({
            message: CONTENT.serverError,
            type: "failure",
          })
        );
      }
    };

    if (displayResumeId) getPdf();
  }, [dispatch, displayResumeId]);

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
      {isLoading ? (
        <Loader />
      ) : candidates.length === 0 ? (
        <p>
          <i
            className={`bi bi-exclamation-circle ${classes.noRecordsIcon}`}
          ></i>
          {CONTENT.candidateHub.candidate.noRecord}
        </p>
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

Candidates.displayName = "Candidates";
export default Candidates;
