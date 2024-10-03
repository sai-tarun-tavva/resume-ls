import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Candidate from "./Candidate";
import Loader from "../../Atoms/Loader";
import { dataActions, loadingActions, uiActions } from "../../../store";
import { content, END_POINTS, ITEMS_PER_PAGE } from "../../../constants";
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
  const { isLoading } = useSelector((state) => state.loading);

  // Slice the filtered candidates to display only the current page
  const candidates = filteredCandidates.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    /**
     * Fetch candidates from the API.
     * @returns {Promise<Array>} The list of candidates.
     */
    const fetchCandidates = async () => {
      try {
        const response = await fetch(END_POINTS.FETCH_CANDIDATES);

        if (!response.ok) {
          throw new Error(`Error fetching candidates: ${response.statusText}`);
        }

        const resData = await response.json();
        return resData.results; // Return the candidates' data
      } catch (error) {
        console.error(error);
        return []; // Handle errors by returning an empty array or any error state
      }
    };

    /**
     * Fetch candidates and update context state.
     */
    const getData = async () => {
      dispatch(loadingActions.enableLoading());
      const candidates = await fetchCandidates();
      dispatch(dataActions.replaceCandidates(candidates));
      dispatch(dataActions.replaceFilteredCandidates(candidates));
      dispatch(loadingActions.disableLoading());
    };

    // Fetch candidates only for the first time
    if (globalCandidates.length === 0 || shouldRefetch) {
      getData();
      dispatch(uiActions.updateShouldRefetch(false));
    } else dispatch(loadingActions.disableLoading());
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
          {content.candidateHub.candidate.noRecord}
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
