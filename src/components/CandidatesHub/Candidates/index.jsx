import { useContext, useEffect } from "react";
import Candidate from "./Candidate";
import Loader from "../../Atoms/Loader";
import { DataContext, LoadingContext } from "../../../store";
import { content, END_POINTS, ITEMS_PER_PAGE } from "../../../constants";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.css";

const Candidates = () => {
  const {
    startIndex,
    candidateData,
    filteredCandidateData,
    onDataChange,
    onFilteredDataChange,
  } = useContext(DataContext);

  const { isFetching: isLoading, handleFetching: setLoading } =
    useContext(LoadingContext);

  const candidates = filteredCandidateData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch(END_POINTS.FETCH_CANDIDATES);

        if (!response.ok) {
          throw new Error(`Error fetching candidates: ${response.statusText}`);
        }

        const resData = await response.json();
        return resData.results;
      } catch (error) {
        console.error(error);
        return []; // Handle errors by returning an empty array or any error state
      }
    };

    const getData = async () => {
      setLoading(true);
      const candidates = await fetchCandidates();
      onDataChange(candidates); // save once (ineditable unless page reload)
      onFilteredDataChange(candidates); // to filter data based on search
      setLoading(false);
    };

    // Fetch candidates only for the first time
    if (candidateData.length === 0) getData();
    else setLoading(false);
  }, [onDataChange, onFilteredDataChange, candidateData.length, setLoading]);

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
