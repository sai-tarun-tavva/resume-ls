import { CONTENT, END_POINTS } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * HelperMessage Component
 *
 * Displays a helper message with a link to learn more about batch processing.
 * The message content and link text are sourced from the content constants.
 *
 * @returns {JSX.Element} Rendered HelperMessage component.
 */
const HelperMessage = () => {
  const { message, urlText } = CONTENT.INSIGHT.upload.helper;

  return (
    <div className={classes.helper}>
      <p>{message}</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={END_POINTS.INSIGHT.BATCH_PROCESS}
        aria-label={`Learn more about batch processing at ${END_POINTS.INSIGHT.BATCH_PROCESS}`}
      >
        {urlText}
      </a>
    </div>
  );
};

HelperMessage.displayName = "HelperMessage";
export default HelperMessage;
