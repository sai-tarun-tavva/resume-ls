import React from "react";
import Candidate from "./Candidate";
import { ITEMS_PER_PAGE } from "../../utilities/constants";
import styles from "./index.module.css";

const Candidates = ({ startIndex, data }) => {
  const candidates = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  return (
    <div className={styles.cards}>
      {candidates.length === 0
        ? "No results found"
        : candidates.map((candidate) => (
            <Candidate key={candidate.id} candidate={candidate} />
          ))}
    </div>
  );
};

Candidates.displayName = "Candidates";
export default Candidates;
