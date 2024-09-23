import React from "react";
import MainInfo from "./MainInfo";
import Location from "./Location";
import Skills from "./Skills";
import Actions from "./Actions";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

const Candidate = ({ candidate: info }) => {
  return (
    <article className={styles.card}>
      <MainInfo info={info} />
      <Location info={info} />
      <Skills info={info} />

      <div className={styles["hidden-actions"]}>
        <div className={styles.actions}>
          <Actions />
        </div>
      </div>
    </article>
  );
};

Candidate.displayName = "Candidate";
export default Candidate;
