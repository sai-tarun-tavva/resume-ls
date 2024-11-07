import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Atoms/components/Loader";
import Header from "./Header";
import Response from "./Response";
import OverlayMessage from "../OverlayMessage";
import { useLoading } from "../../../../store";
import { resultActions } from "../../store";
import classes from "./index.module.scss";

/**
 * Results Component
 *
 * Displays the results of operations and handles loading state.
 *
 * @returns {JSX.Element} The results component.
 */
const Results = () => {
  const dispatch = useDispatch();
  const { isLoading } = useLoading();
  const { selectedKey } = useSelector((state) => state.result);

  const handleSelectResults = (key) => {
    dispatch(resultActions.updateSelectedKey(key));
  };

  return selectedKey ? (
    <>
      {isLoading.fetch ? (
        <div className={classes.loaderContainer}>
          <Loader />
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
