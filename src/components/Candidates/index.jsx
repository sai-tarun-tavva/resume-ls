import React, { useContext, useEffect } from "react";
import Candidate from "./Candidate";
import { DataContext } from "../../store/DataContextProvider";
import { ITEMS_PER_PAGE } from "../../utilities/constants";
import styles from "./index.module.css";

const Candidates = () => {
  const { startIndex, candidateData, onFilteredDataChange } =
    useContext(DataContext);

  const candidates = candidateData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch(
          // Pending Update
          "https://run.mocky.io/v3/fdedfa33-d534-407a-9755-f13407a1161b"
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
      const candidates = await fetchCandidates();
      onFilteredDataChange(candidates);
    };

    // Fetch candidates only for the first time
    if (candidateData.length === 0) getData();
  }, [onFilteredDataChange, candidateData.length]);

  return (
    <section className={styles.cards}>
      {candidates.length === 0 ? (
        <p>Failed to fetch records.</p>
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
