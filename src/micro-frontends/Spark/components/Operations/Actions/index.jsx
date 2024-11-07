import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import { dataActions } from "../../../store";
import { CONTENT } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * Actions Component
 *
 * Displays a list of actions that can be selected by the user.
 *
 * @param {Object} props - The component props.
 * @param {string} props.error - Error message related to actions.
 * @param {function} props.setError - Function to set the error message.
 * @returns {JSX.Element} The actions component.
 */
const Actions = ({ error, setError }) => {
  const dispatch = useDispatch();
  const { selectedActions } = useSelector((state) => state.data);
  const {
    error: errorMessage,
    header,
    items: actionItems,
  } = CONTENT.SPARK.operations.actions;

  const handleCheckboxChange = (key) => {
    let updatedActions = [...selectedActions];
    if (updatedActions.includes(key)) {
      updatedActions = updatedActions.filter((action) => action !== key);
    } else {
      updatedActions.push(key);
    }
    dispatch(dataActions.updateSelectedActions(updatedActions));
    if (updatedActions.length > 0) {
      setError("");
    } else {
      setError(errorMessage);
    }
  };

  return (
    <section className={classes.actionsContainer}>
      <h3 className={classes.title}>{header}</h3>
      <div className={classes.actions}>
        {Object.entries(actionItems).map(([apiKey, name], index) => (
          <Checkbox
            key={index}
            apiKey={apiKey}
            name={name}
            onChange={handleCheckboxChange}
          />
        ))}
      </div>
      <small className={classes.errorText}>{error || ""}</small>
    </section>
  );
};

Actions.propTypes = {
  error: PropTypes.string,
  setError: PropTypes.func.isRequired,
};

export default Actions;
