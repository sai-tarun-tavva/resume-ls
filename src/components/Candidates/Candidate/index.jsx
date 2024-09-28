import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainInfo from "./MainInfo";
import Location from "./Location";
import Skills from "./Skills";
import Actions from "./Actions";
import { StatusMsgContext } from "../../../store/StatusMsgContextProvider";
import { calculateTimeAgo } from "../../../utilities";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./index.module.css";

const Candidate = ({ candidate }) => {
  const navigate = useNavigate();
  const { handleViewStatus } = useContext(StatusMsgContext);
  const formattedTime = calculateTimeAgo(new Date(candidate.timestamp));

  const handleEdit = (event) => {
    event.preventDefault();
    handleViewStatus("", ""); // reset status to unmount on edit
    navigate(`edit/${candidate.id}`);
  };

  return (
    <article className={styles.card}>
      <div className={styles["card-content"]}>
        <MainInfo candidate={candidate} />
        <Location candidate={candidate} />
        <Skills skills={candidate.skills} />

        <div className={styles["hidden-actions"]}>
          <div className={styles.actions}>
            <Actions onEdit={handleEdit} />
          </div>
        </div>

        <small className={styles["time-ago"]}>{formattedTime}</small>
      </div>
    </article>
  );
};

Candidate.displayName = "Candidate";
export default Candidate;
