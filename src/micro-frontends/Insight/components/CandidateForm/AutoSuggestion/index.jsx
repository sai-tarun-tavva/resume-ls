import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Skills from "../../../../atoms/Skills";
import Button from "../../../../atoms/Button";
import { CONTENT } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * AutoSuggestion Component
 *
 * Provides skill suggestions to the user, allowing them to select or create new skills.
 * Displays a loading state when skills are being fetched and allows the creation of new skills.
 *
 * @param {Object} props - The props for the AutoSuggestion component.
 * @param {function} props.addSkill - Function to add a skill from the suggestions.
 * @param {function} props.createSkill - Function to create a new skill.
 * @param {boolean} props.disableCreate - Indicates if the create button should be disabled.
 * @param {Array} props.suggestions - List of suggested skills to display.
 * @returns {JSX.Element} The rendered AutoSuggestion component.
 */
const AutoSuggestion = ({
  addSkill,
  createSkill,
  disableCreate,
  suggestions,
}) => {
  const { isFetchLoading: fetchingSkills } = useSelector(
    (state) => state.loading
  );
  const { helper, button } = CONTENT.candidateHub.candidateForm.suggestions;

  return (
    <div className={classes.suggestionContainer}>
      <span className={classes.header}>
        <i className="bi bi-lightbulb-fill" />
        <p>{helper}</p>
        {fetchingSkills && <div className={classes.loader}></div>}
      </span>

      {!fetchingSkills && (
        <Skills isSelectable selectHandler={addSkill} skills={suggestions} />
      )}

      <Button
        className={classes.suggestionButton}
        onClick={createSkill}
        disabled={disableCreate}
      >
        {button.create.default}
        <i className="bi bi-plus-circle"></i>
      </Button>
    </div>
  );
};

AutoSuggestion.propTypes = {
  addSkill: PropTypes.func.isRequired,
  createSkill: PropTypes.func.isRequired,
  disableCreate: PropTypes.bool.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

AutoSuggestion.displayName = "AutoSuggestion";

export default AutoSuggestion;
