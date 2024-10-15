import { CONTENT, END_POINTS } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * HelperMessage Component
 *
 *
 * Displays a helper message along with a link to batch processing.
 * The message and link text are sourced from the content object.
 *
 * @returns {JSX.Element} Rendered HelperMessage component
 */
const HelperMessage = () => {
  const { message, urlText } = CONTENT.candidateHub.upload.helper;

  return (
    <div className={classes.helper}>
      <p>{message}</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={END_POINTS.BATCH_PROCESS}
        aria-label={`Learn more about batch processing at ${END_POINTS.BATCH_PROCESS}`}
      >
        {urlText}
      </a>
    </div>
  );
};

HelperMessage.displayName = "HelperMessage";
export default HelperMessage;
