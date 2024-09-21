import React from "react";
import Candidate from "./Candidate";
import styles from "./index.module.css";

const ITEMS_PER_PAGE = 10;

const Candidates = ({ startIndex, data }) => {
  const currentItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  return (
    <div className={styles.cards}>
      {currentItems.length === 0
        ? "No results found"
        : currentItems.map((item) => <Candidate key={item.id} item={item} />)}
    </div>
  );
};

Candidates.displayName = "Candidates";
export default Candidates;
