import React, { useContext, useEffect } from "react";
import Candidate from "./Candidate";
import Loader from "../../Atoms/Loader";
import { DataContext } from "../../../store/DataContextProvider";
import { LoadingContext } from "../../../store/LoadingContextProvider";
import { ITEMS_PER_PAGE } from "../../../utilities/constants";
import styles from "./index.module.css";

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
        const response = await fetch(
          // Pending Update
          "https://run.mocky.io/v3/afb6ff56-baf8-4804-968e-842f71b19b46"
        );

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
    <section className={styles.cards}>
      {isLoading ? (
        <Loader />
      ) : candidates.length === 0 ? (
        <p>No records found.</p>
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
