import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainInfo from "./MainInfo";
import Location from "./Location";
import Actions from "./Actions";
import Skills from "../../../Atoms/Skills";
import { StatusMsgContext } from "../../../../store";
import { calculateTimeAgo, isCandidateNew } from "../../../../utilities";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "./index.module.css";

const Candidate = ({ candidate }) => {
  const navigate = useNavigate();
  const { handleViewStatus } = useContext(StatusMsgContext);

  const dateCreated = new Date(candidate.timestamp);
  const isNew = isCandidateNew(dateCreated);
  const formattedTime = calculateTimeAgo(dateCreated);

  const handleEdit = (event) => {
    event.preventDefault();
    handleViewStatus(); // reset status to unmount on edit
    navigate(`edit/${candidate.id}`);
  };

  return (
    <article className={classes.card}>
      <div
        className={classes.cardContent}
        data-new={isNew ? "true" : "false"}
        style={{
          "--time-ago": `"${formattedTime}"`,
        }}
      >
        <MainInfo candidate={candidate} />
        <Location candidate={candidate} />
        <Skills skills={candidate.skills} />

        <div className={classes.hiddenActions}>
          <div className={classes.actions}>
            <Actions onEdit={handleEdit} />
          </div>
        </div>
      </div>
    </article>
  );
};

Candidate.displayName = "Candidate";
export default Candidate;
