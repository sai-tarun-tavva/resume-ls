import React, { useContext, useState } from "react";
import Candidate from "./Candidate";
import { DataContext } from "../../store/DataContextProvider";
import { ITEMS_PER_PAGE } from "../../utilities/constants";
import styles from "./index.module.css";

const Candidates = () => {
  const { startIndex, candidateData } = useContext(DataContext);
  const [editingCandidateId, setEditingCandidateId] = useState(null);

  const handleEdit = (event, id) => {
    event.preventDefault();
    setEditingCandidateId((prevId) => (prevId === id ? null : id));
  };

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
          <Candidate
            key={candidate.id}
            candidate={candidate}
            isEditing={editingCandidateId === candidate.id}
            onEdit={handleEdit}
          />
        ))
      )}
    </section>
  );
};

Candidates.displayName = "Candidates";
export default Candidates;
