import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Candidate from "./Candidate";
import Loader from "../../Atoms/Loader";
import {
  dataActions,
  loadingActions,
  statusActions,
  uiActions,
} from "../../../store";
import { fetchCandidates } from "../../../utilities";
import { CONTENT, ITEMS_PER_PAGE, STATUS_CODES } from "../../../constants";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.scss";

/**
 * Candidates Component
 *
 * Fetches and displays candidate information.
 *
 * @returns {JSX.Element} The rendered candidates component.
 */
const Candidates = () => {
  const dispatch = useDispatch();
  const { startIndex, shouldRefetch } = useSelector((state) => state.ui);
  const { candidates: globalCandidates, filteredCandidates } = useSelector(
    (state) => state.data
  );
  const { isAppLoading: isLoading } = useSelector((state) => state.loading);

  // Slice the filtered candidates to display only the current page
  const candidates = filteredCandidates.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    /**
     * Fetch candidates and update context state.
     */
    const getData = async () => {
      dispatch(loadingActions.enableAppLoading());
      const { status, data: candidates } = await fetchCandidates();

      if (status === STATUS_CODES.SUCCESS) {
        dispatch(dataActions.replaceCandidates(candidates));
        dispatch(dataActions.replaceFilteredCandidates(candidates));
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

    // Fetch candidates only for the first time
    if (globalCandidates.length === 0 || shouldRefetch) {
      getData();
      dispatch(uiActions.updateShouldRefetch(false));
    } else dispatch(loadingActions.disableAppLoading());
  }, [globalCandidates.length, dispatch, shouldRefetch]);

  return (
    <section className={classes.cards}>
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
        candidates.map((candidate) => (
          <Candidate key={candidate.id} candidate={candidate} />
        ))
      )}
    </section>
  );
};

Candidates.displayName = "Candidates";
export default Candidates;
