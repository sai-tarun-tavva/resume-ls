import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Atoms/components/Loader";
import Header from "./Header";
import Response from "./Response";
import OverlayMessage from "../OverlayMessage";
import { useLoading } from "../../../../store";
import { resultActions } from "../../store";
import { LOADING_ACTION_TYPES } from "../../../../constants";
import classes from "./index.module.scss";

const { FETCH } = LOADING_ACTION_TYPES;

/**
 * Results Component
 *
 * Displays the results of various operations, including a loading state if data is being fetched.
 * Renders the appropriate content based on the selected key in the state.
 *
 * @component
 * @returns {JSX.Element} The rendered Results component.
 */
const Results = () => {
  const dispatch = useDispatch();
  const { isLoading } = useLoading();
  const { selectedKey } = useSelector((state) => state.result);

  /**
   * Updates the selected results key in the Redux store, which determines the displayed content.
   *
   * @param {string} key - The key representing the selected operation or result section.
   */
  const handleSelectResults = (key) => {
    dispatch(resultActions.updateSelectedKey(key));
  };

  return selectedKey ? (
    <>
      {isLoading[FETCH] ? (
        <div className={classes.loaderContainer}>
          <Loader extraClass={classes.loaderContainer} />
        </div>
      ) : (
        <article className={classes.results}>
          <Header clickHandler={handleSelectResults} />
          <Response />
        </article>
      )}
    </>
  ) : (
    <OverlayMessage />
  );
};

export default Results;
Results.displayName = "Results";
