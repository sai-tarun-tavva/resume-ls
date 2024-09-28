import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainInfo from "./MainInfo";
import Location from "./Location";
import Skills from "./Skills";
import Actions from "./Actions";
import { StatusMsgContext } from "../../../store/StatusMsgContextProvider";
import { isCandidateNew, calculateTimeAgo } from "../../../utilities";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

const Candidate = ({ candidate }) => {
  const navigate = useNavigate();
  const { handleViewStatus } = useContext(StatusMsgContext);

  const dateCreated = new Date(candidate.timestamp);
  const isNew = isCandidateNew(dateCreated);
  const formattedTime = calculateTimeAgo(dateCreated);

  const handleEdit = (event) => {
    event.preventDefault();
    handleViewStatus("", ""); // reset status to unmount on edit
    navigate(`edit/${candidate.id}`);
  };

  return (
    <article className={styles.card}>
      <div
        className={styles["card-content"]}
        data-new={isNew ? "true" : "false"}
        style={{
          "--time-ago": `"${formattedTime}"`,
        }}
      >
        <MainInfo candidate={candidate} />
        <Location candidate={candidate} />
        <Skills skills={candidate.skills} />

        <div className={styles["hidden-actions"]}>
          <div className={styles.actions}>
            <Actions onEdit={handleEdit} />
          </div>
        </div>
      </div>
    </article>
  );
};

Candidate.displayName = "Candidate";
export default Candidate;
