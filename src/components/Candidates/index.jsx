import React, { useContext } from "react";
import Candidate from "./Candidate";
import { DataContext } from "../../store/DataContextProvider";
import { ITEMS_PER_PAGE } from "../../utilities/constants";
import styles from "./index.module.css";

const Candidates = () => {
  const { startIndex, candidateData } = useContext(DataContext);

  const candidates = candidateData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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
