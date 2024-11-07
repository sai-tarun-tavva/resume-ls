import PropTypes from "prop-types";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import { CONTENT } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * Actions Component
 *
 * Displays a list of actions that can be selected by the user.
 *
 * @param {Object} props - The component props.
 * @param {string} props.error - Error message related to actions.
 * @param {function} props.setActionsError - Function to set the error message.
 * @returns {JSX.Element} The actions component.
 */
const Actions = ({
  selectedActions,
  setSelectedActions,
  actionsError,
  setActionsError,
  isRequired,
}) => {
  const { header, items: actionItems } = CONTENT.SPARK.operations.actions;
  const errorMessage = CONTENT.COMMON.errors.actions.empty;

  const handleCheckboxChange = (event) => {
    const key = event.target.id;

    let updatedActions = [...selectedActions];
    if (updatedActions.includes(key)) {
      updatedActions = updatedActions.filter((action) => action !== key);
    } else {
      updatedActions.push(key);
    }
    setSelectedActions(updatedActions);
    if (updatedActions.length > 0) {
      setActionsError("");
    } else {
      setActionsError(errorMessage);
    }
  };

  return (
    <section className={classes.actionsContainer}>
      <h3 className={classes.title}>
        {header} {isRequired && <span className={classes.required}>*</span>}
      </h3>
      <div className={classes.actions}>
        {Object.entries(actionItems).map(([apiKey, name], index) => (
          <Checkbox
            key={index}
            apiKey={apiKey}
            id={apiKey}
            label={name}
            value={selectedActions.includes(apiKey)}
            changeHandler={handleCheckboxChange}
            extraClass={classes.extraCheckboxControl}
          />
        ))}
      </div>
      <small className={classes.errorText}>{actionsError || ""}</small>
    </section>
  );
};

Actions.propTypes = {
  error: PropTypes.string,
  setActionsError: PropTypes.func.isRequired,
};

export default Actions;
