import PropTypes from "prop-types";
import Checkbox from "../../../../Atoms/components/Inputs/Checkbox";
import { CONTENT } from "../../../../../constants";
import classes from "./index.module.scss";

/**
 * Actions Component
 *
 * Displays a list of selectable actions, with a required indicator if needed.
 * Manages and validates selected actions, displaying an error if no actions are selected.
 *
 * @param {Object} props - The component props.
 * @param {Array<string>} props.selectedActions - List of selected action keys.
 * @param {function} props.setSelectedActions - Function to update selected actions.
 * @param {string} props.actionsError - Error message related to actions selection.
 * @param {function} props.setActionsError - Function to set the error message.
 * @param {boolean} props.isRequired - Indicates if selecting an action is mandatory.
 * @returns {JSX.Element} The rendered actions component.
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

  /**
   * Handles changes to the selected actions, adding or removing actions based on checkbox state.
   *
   * @param {ChangeEvent} event - The change event triggered by the checkbox.
   */
  const handleCheckboxChange = (event) => {
    const key = event.target.id;

    let updatedActions = [...selectedActions];
    if (updatedActions.includes(key)) {
      updatedActions = updatedActions.filter((action) => action !== key);
    } else {
      updatedActions.push(key);
    }

    setSelectedActions(updatedActions);
    setActionsError(updatedActions.length > 0 ? "" : errorMessage);
  };

  /**
   * Prevents form submission when the Enter key is pressed on a checkbox.
   *
   * @param {KeyboardEvent} event - The keyboard event triggered on key press.
   */
  const preventSubmitOnEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
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
            id={apiKey}
            label={name}
            value={selectedActions.includes(apiKey)}
            changeHandler={handleCheckboxChange}
            extraClass={classes.extraCheckboxControl}
            onKeyDown={preventSubmitOnEnter}
          />
        ))}
      </div>
      <small className={classes.errorText}>{actionsError || ""}</small>
    </section>
  );
};

Actions.propTypes = {
  selectedActions: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedActions: PropTypes.func.isRequired,
  actionsError: PropTypes.string,
  setActionsError: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
};

export default Actions;
Actions.displayName = "Actions";
