import React from "react";
import MainInfo from "./MainInfo";
import Location from "./Location";
import Skills from "./Skills";
import Actions from "./Actions";
import CandidateForm from "./CandidateForm";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

const Candidate = ({ candidate: info, isEditing, onEdit }) => {
  return (
    <article className={`${styles.card} ${isEditing ? styles.enlarged : ""}`}>
      <div className={styles["card-static"]}>
        <MainInfo info={info} />
        <Location info={info} />
        <Skills skills={info.skills} />

        <div className={styles["hidden-actions"]}>
          <div className={styles.actions}>
            <Actions handleEdit={(event) => onEdit(event, info.id)} />
          </div>
        </div>
      </div>

      {isEditing && (
        <CandidateForm
          info={info}
          handleClose={(event) => onEdit(event, info.id)}
        />
      )}
    </article>
  );
};

Candidate.displayName = "Candidate";
export default Candidate;
