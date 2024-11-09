import { CONTENT } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * NoRecords Component
 *
 * Displays a message indicating that no records are available.
 *
 * @returns {JSX.Element} The NoRecords component.
 */
const NoRecords = () => {
  return (
    <p className={classes.noRecordText}>
      <i className={`bi bi-exclamation-circle ${classes.noRecordsIcon}`}></i>
      {CONTENT.COMMON.noCandidateRecord}
    </p>
  );
};

NoRecords.displayName = "NoRecords";
export default NoRecords;
