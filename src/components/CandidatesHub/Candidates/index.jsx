import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Candidate from "./Candidate";
import Loader from "../../Atoms/Loader";
import ResumeViewer from "../ResumeViewer";
import {
  dataActions,
  loadingActions,
  statusActions,
  uiActions,
  viewResumeActions,
} from "../../../store";
import {
  buildFetchCandidatesUrl,
  fetchCandidates,
  fetchPdf,
} from "../../../utilities";
import { CONTENT, CANDIDATES_PER_PAGE, STATUS_CODES } from "../../../constants";
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
  const [pdfDetails, setPdfDetails] = useState({ name: "", size: "", url: "" });

  useEffect(() => {
    /**
     * Fetch candidates and update redux state.
     */
    const url = refetchURL || buildFetchCandidatesUrl("", CANDIDATES_PER_PAGE);

    const getData = async () => {
      dispatch(loadingActions.enableAppLoading());

      const { status, data } = await fetchCandidates(url);

      const {
        count: totalCount,
        previous: previousURL,
        next: nextURL,
        results: candidates,
      } = data;

      if (status === STATUS_CODES.SUCCESS) {
        dispatch(dataActions.replaceCandidates(candidates));
        dispatch(
          uiActions.updatePagination({
            previousURL,
            nextURL,
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
     * Fetch resume pdf and update redux state.
     */
    const getPdf = async () => {
      dispatch(loadingActions.enableFetchLoading());
      const { status, data } = await fetchPdf();
      dispatch(loadingActions.disableFetchLoading());

      if (status === STATUS_CODES.SUCCESS) {
        setPdfDetails(data);
      } else {
        dispatch(viewResumeActions.hideResume());
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

  return (
    <section className={`${classes.cards} ${showResume && classes.smaller}`}>
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
            <Candidate key={candidate.id} candidate={candidate} />
          ))}
          {showResume && <ResumeViewer details={pdfDetails} />}
        </Fragment>
      )}
    </section>
  );
};

Candidates.displayName = "Candidates";
export default Candidates;
