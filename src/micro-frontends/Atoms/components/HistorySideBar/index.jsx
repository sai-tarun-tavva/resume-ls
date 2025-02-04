import React from "react";
import PropTypes from "prop-types";
import { useUI } from "../../../../store";
import { formatTimestamp } from "../../../../utilities";
import classes from "./index.module.scss";
import { CONTENT } from "../../../../constants";

/**
 * HistorySideBar Component
 *
 * Displays the status history of a candidate in a sidebar with a timeline view.
 * Includes candidate name, status messages, and icons for better visualization.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.candidateName - The name of the candidate whose history is being displayed.
 * @param {Array} props.historyList - The list of status history objects for the candidate.
 * @returns {JSX.Element} The rendered HistorySideBar component.
 */
const HistorySideBar = ({ candidateName, historyList = [] }) => {
  const {
    state: { isSideBarVisible },
    hideSideBar,
  } = useUI();

  const {
    heading,
    statusMessages: messages,
    icons,
  } = CONTENT.COMMON.historySideBar;

  return (
    <aside
      className={`${classes.timeline} ${
        isSideBarVisible ? classes.visible : ""
      }`}
    >
      {/* Header Section */}
      <div className={classes.header}>
        <div>
          <h2>{candidateName}</h2>
          <p className={classes.subtitle}>{heading}</p>
        </div>
        <button
          className={classes.closeButton}
          onClick={hideSideBar}
          aria-label="Close"
        >
          <i className="bi bi-x" />
        </button>
      </div>

      {/* Timeline Content */}
      <div className={classes.timelineContent}>
        {[...historyList]
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by most recent timestamp
          .map((item, index) => (
            <div
              key={index}
              className={`${classes.timelineItem} ${classes.animateOnView}`}
            >
              {/* Icon Section */}
              <div className={classes.iconContainer}>
                <span className={classes.icon}>
                  {icons[item.updated_status]}
                </span>
                {index !== historyList.length - 1 && (
                  <div className={classes.line} />
                )}
              </div>

              {/* Content Section */}
              <div className={classes.content}>
                <div
                  className={classes.statusBadge}
                  data-status={item.updated_status}
                >
                  {item.updated_status}
                </div>
                <p className={classes.message}>
                  {messages[item.updated_status]}
                </p>
                <time className={classes.timestamp}>
                  {formatTimestamp(item.timestamp)}
                </time>
              </div>
            </div>
          ))}
      </div>
    </aside>
  );
};

HistorySideBar.propTypes = {
  candidateName: PropTypes.string.isRequired,
  historyList: PropTypes.arrayOf(
    PropTypes.shape({
      updated_status: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

HistorySideBar.displayName = "HistorySideBar";
export default HistorySideBar;
