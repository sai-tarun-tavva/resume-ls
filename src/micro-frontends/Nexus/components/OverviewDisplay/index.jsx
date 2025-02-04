import { useSelector } from "react-redux";
import MarkdownDisplay from "../../../Atoms/components/MarkdownDisplay";
import FloatingButton from "../../../Atoms/components/FloatingButton";
import { useLoading } from "../../../../store";
import { handleTextDownloadAsPDF } from "../../../../utilities";
import { CONTENT, LOADING_ACTION_TYPES } from "../../../../constants";
import classes from "./index.module.scss";

const { FETCH } = LOADING_ACTION_TYPES;

/**
 * OverviewDisplay Component
 *
 * Renders the overview of the scraped website. It fetches the overview data from
 * the Redux store and displays it using the MarkdownDisplay component. If no data is
 * available, it displays a placeholder message.
 *
 * @returns {JSX.Element} The OverviewDisplay component.
 */
const OverviewDisplay = () => {
  const { isLoading } = useLoading();
  const { overview } = useSelector((state) => state.result);
  const { overview: overviewContent } = CONTENT.NEXUS;

  return (
    <div className={classes.overviewContainer}>
      {isLoading[FETCH] ? (
        <div className={classes.loaderScene}>
          <div className={classes.scanningText}>
            <i className="bi bi-cpu"></i>
            <p>{overviewContent.loader}</p>
            <div className={classes.progressDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      ) : overview.length > 0 ? (
        <div className={classes.resultScene}>
          <MarkdownDisplay analysisResult={overview} />
        </div>
      ) : (
        <div className={classes.welcomeScene}>
          <div className={classes.messageBox}>
            <div className={classes.orbitSystem}>
              <div className={classes.centerIcon}>
                <i className="bi bi-search"></i>
              </div>
              <div className={classes.orbit}>
                <i className="bi bi-code-slash"></i>
                <i className="bi bi-boxes"></i>
                <i className="bi bi-bug"></i>
                <i className="bi bi-braces"></i>
              </div>
            </div>

            <div className={classes.textContent}>
              <h1>{overviewContent.welcome.heading}</h1>
              <p>{overviewContent.welcome.subHeading}</p>
            </div>

            <div className={classes.features}>
              <div className={classes.feature}>
                <i className="bi bi-layers"></i>
                <span>{overviewContent.welcome.feature1}</span>
              </div>
              <div className={classes.feature}>
                <i className="bi bi-diagram-3"></i>
                <span>{overviewContent.welcome.feature2}</span>
              </div>
              <div className={classes.feature}>
                <i className="bi bi-shield-check"></i>
                <span>{overviewContent.welcome.feature3}</span>
              </div>
            </div>

            <div className={classes.indicator}>
              <i className="bi bi-arrow-up-circle"></i>
              <span>{overviewContent.welcome.indicator}</span>
            </div>
          </div>
        </div>
      )}

      {overview.length > 0 && (
        <FloatingButton
          clickHandler={() => handleTextDownloadAsPDF(overview)}
          title={"Download PDF"}
          icon={
            <i
              style={{ WebkitTextStroke: "0.03rem" }}
              className="bi bi-file-earmark-pdf"
            />
          }
        />
      )}
    </div>
  );
};

OverviewDisplay.displayName = "OverviewDisplay";
export default OverviewDisplay;
