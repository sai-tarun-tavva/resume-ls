import { useCallback, useEffect, useState } from "react";
import Tooltip from "../../../Atoms/components/Tooltip";
import Loader from "../../../Atoms/components/Loader";
import { useLoading } from "../../../../store";
import { getInsightBatchProcessStatus } from "../../../../utilities";
import { LOADER_TYPES, LOADING_ACTION_TYPES } from "../../../../constants";
import { BATCH_PROCESS_STATUS } from "../../constants";
import classes from "./index.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;

// SVG circle circumference constant for progress bar calculations
const CIRCUMFERENCE = 126; // 2 * π * radius

/**
 * BatchStatus Component
 *
 * Displays the batch processing status with a progress indicator,
 * using a circular progress bar and dynamic status updates.
 *
 * @component
 * @returns {JSX.Element} The rendered BatchStatus component.
 */
const BatchStatus = () => {
  const [status, setStatus] = useState(BATCH_PROCESS_STATUS.NO_FILES); // Current batch status
  const [message, setMessage] = useState(""); // Current status message
  const [totalFiles, setTotalFiles] = useState(0); // Total number of files to process
  const [processedFiles, setProcessedFiles] = useState(0); // Number of processed files

  const { isLoading, enableButtonLoading, disableButtonLoading } = useLoading();

  /**
   * Function to connect to the batch processing API and update the status dynamically.
   * It triggers the API call and handles the data streaming logic.
   */
  const connectAPI = useCallback(() => {
    enableButtonLoading();

    getInsightBatchProcessStatus(
      setStatus,
      setMessage,
      setTotalFiles,
      setProcessedFiles
    );

    disableButtonLoading();
  }, [enableButtonLoading, disableButtonLoading]);

  /**
   * Effect to initialize the API call when the component is mounted or the loading status changes.
   * Ensures the streaming process starts only when the button is not loading.
   */
  useEffect(() => {
    if (!isLoading[BUTTON]) {
      connectAPI();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectAPI]);

  /**
   * Hover handler to trigger a refetch of the status.
   * Ensures updated information is fetched on user interaction.
   */
  const statusHoverHandler = () => {
    if (!isLoading[BUTTON]) {
      connectAPI();
    }
  };

  /**
   * Calculates the progress percentage for the circular progress bar based on
   * the total number of files and the number of processed files.
   */
  const progressPercentage =
    status === BATCH_PROCESS_STATUS.PROCESSED ||
    status === BATCH_PROCESS_STATUS.ERROR
      ? 100
      : totalFiles > 0
      ? (processedFiles / totalFiles) * 100
      : 0;

  /**
   * Calculates the stroke offset for the circular progress bar to visually represent progress.
   */
  const strokeDashoffset =
    CIRCUMFERENCE - (progressPercentage / 100) * CIRCUMFERENCE;

  /**
   * JSX content for the processed file status displayed as `<processed>/<total>`.
   */
  const processStatus = (
    <span className={classes.processCount}>
      <strong>{processedFiles}</strong> out of <strong>{totalFiles}</strong>{" "}
      files processed.
    </span>
  );

  return (
    <Tooltip
      extraClass={classes.tooltipStatusExtraClass}
      baseContentToHover={
        <div
          className={`${classes.batchStatus} ${classes[status]}`}
          onMouseEnter={statusHoverHandler}
        >
          <div className={classes.progressWrapper}>
            <svg
              className={classes.circularProgress}
              viewBox="0 0 50 50"
              preserveAspectRatio="xMidYMid meet"
            >
              <circle
                className={classes.progressBackground}
                cx="25"
                cy="25"
                r="20"
                strokeWidth="5"
              />
              {status !== BATCH_PROCESS_STATUS.NO_FILES && (
                <circle
                  className={classes.progressForeground}
                  cx="25"
                  cy="25"
                  r="20"
                  strokeWidth="5"
                  style={{
                    strokeDasharray: CIRCUMFERENCE,
                    strokeDashoffset,
                  }}
                />
              )}
            </svg>
            <i className={`bi bi-arrow-repeat ${classes.icon}`}></i>
          </div>
        </div>
      }
    >
      {isLoading[BUTTON] ? (
        <Loader type={LOADER_TYPES.BAR} extraClass={classes.loaderExtraClass} />
      ) : (
        <div className={classes.statusMessage}>
          {status === BATCH_PROCESS_STATUS.NO_FILES ||
          status === BATCH_PROCESS_STATUS.ERROR ||
          status === BATCH_PROCESS_STATUS.PROCESSED ? (
            <>
              <i
                className={`bi ${
                  status === BATCH_PROCESS_STATUS.ERROR
                    ? "bi-x-circle-fill"
                    : "bi-check-circle-fill"
                } ${classes.iconStatus} ${classes[status]}`}
              ></i>
              <span className={classes[status]}>
                {message || "No resumes found for processing."}
              </span>
              {processedFiles && totalFiles ? processStatus : <></>}
            </>
          ) : (
            <>
              <i
                className={
                  status === BATCH_PROCESS_STATUS.PROCESSING_WARNING
                    ? `bi bi-exclamation-triangle-fill ${classes.warningIcon}`
                    : `bi bi-clock ${classes.clockIcon}`
                }
              ></i>
              {status === BATCH_PROCESS_STATUS.PROCESSING_WARNING && (
                <div className={classes.messageWrapper}>
                  <span className={classes[status]}>{message}</span>
                </div>
              )}
              {processStatus}
            </>
          )}
        </div>
      )}
    </Tooltip>
  );
};

BatchStatus.displayName = "BatchStatus";
export default BatchStatus;
