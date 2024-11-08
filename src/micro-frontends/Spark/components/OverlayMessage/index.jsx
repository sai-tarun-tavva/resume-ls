import Loader from "../../../Atoms/components/Loader";
import { useLoading } from "../../../../store";
import { LOADING_ACTION_TYPES } from "../../../../constants";
import { CONTENT } from "../../../../constants";
import classes from "./index.module.scss";

const { FETCH } = LOADING_ACTION_TYPES;

/**
 * OverlayMessage Component
 *
 * Displays a message overlay when there are no results.
 *
 * @returns {JSX.Element} The overlay message component.
 */
const OverlayMessage = () => {
  const { isLoading } = useLoading();
  const { title1, title2, subTitle } = CONTENT.SPARK.operations.overlayMessage;

  return (
    <>
      {isLoading[FETCH] ? (
        <Loader extraClass={classes.loaderContainer} />
      ) : (
        <div className={classes.overlay}>
          <div className={classes.content}>
            <h1 className={classes.title}>
              {title1}
              <span className={classes.highlight}>{title2}</span>
            </h1>
            <p className={classes.subTitle}>{subTitle}</p>
            <div className={classes.rocket}>
              <i className="bi bi-rocket-takeoff"></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OverlayMessage;
