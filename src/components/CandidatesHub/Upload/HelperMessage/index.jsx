import { content, END_POINTS } from "../../../../constants";
import classes from "./index.module.css";

const HelperMessage = ({}) => {
  const { message, urlText } = content.candidateHub.upload.helper;
  return (
    <div className={classes.helper}>
      <p>{message}</p>
      {/* Pending change */}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={END_POINTS.BATCH_PROCESS}
      >
        {urlText}
      </a>
    </div>
  );
};

HelperMessage.displayName = "HelperMessage";
export default HelperMessage;
