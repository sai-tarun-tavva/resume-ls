import { useDispatch } from "react-redux";
import Textarea from "../../../Atoms/components/Inputs/Textarea";
import Button from "../../../Atoms/components/Button";
import QuestionsDisplay from "../QuestionsDisplay";
import { useInput } from "../../../Atoms/hooks";
import { useLoading, useStatus } from "../../../../store";
import { resultActions } from "../../store";
import {
  dispatchAsync,
  generateQuestions,
  questValidations,
} from "../../../../utilities";
import {
  CONTENT,
  LOADING_ACTION_TYPES,
  STATUS_CODES,
} from "../../../../constants";
import classes from "./index.module.scss";

const { FETCH } = LOADING_ACTION_TYPES;

/**
 * QuestionsGenerator Component
 *
 * Handles job description input, triggers question generation, and displays the generated questions.
 * Manages loading state, validations, and server interactions.
 *
 * @component
 * @returns {JSX.Element} The QuestionsGenerator component.
 */
const QuestionsGenerator = () => {
  const dispatch = useDispatch();
  const { isLoading, enableFetchLoading, disableFetchLoading } = useLoading();
  const { updateStatus, resetStatus } = useStatus();

  // Custom hook for managing job description input state and validations
  const {
    value: jobDescriptionValue,
    handleInputChange: jobDescriptionChange,
    handleInputBlur: jobDescriptionBlur,
    handleInputFocus: jobDescriptionFocus,
    error: jobDescriptionError,
    isFocused: isJobDescriptionFocused,
    forceValidations: forceJobDescriptionValidations,
  } = useInput("", questValidations.jobDescription, undefined, true);

  /**
   * Handles the generation of questions based on the job description.
   * Validates input, manages loading states, and dispatches actions to update the store.
   *
   * @async
   * @param {Event} event The form submission event.
   */
  const generateHandler = async (event) => {
    event.preventDefault();
    await dispatchAsync(resetStatus);

    // Prevent duplicate fetch calls during loading
    if (isLoading[FETCH]) return;

    if (!jobDescriptionValue) {
      // Force validation if input is empty
      forceJobDescriptionValidations();
    } else {
      enableFetchLoading();

      try {
        const formData = new FormData();
        formData.append("job_description", jobDescriptionValue);

        const { status, data } = await generateQuestions(formData);

        if (status === STATUS_CODES.SUCCESS) {
          dispatch(resultActions.updateQuestions(data));
        } else {
          dispatch(resultActions.updateQuestions([]));
          updateStatus({
            message: CONTENT.COMMON.serverError,
            type: "failure",
          });
        }
      } catch (error) {
        // Handle any unexpected errors
        console.error("Error generating questions:", error);
        updateStatus({
          message: CONTENT.COMMON.serverError,
          type: "failure",
        });
      } finally {
        disableFetchLoading();
      }
    }
  };

  return (
    <section className={classes.generatorContainer}>
      <form>
        {/* Job description input field */}
        <Textarea
          id="description"
          label={CONTENT.QUEST.input.textarea.label}
          value={jobDescriptionValue}
          changeHandler={jobDescriptionChange}
          blurHandler={jobDescriptionBlur}
          focusHandler={jobDescriptionFocus}
          error={jobDescriptionError}
          isFocused={isJobDescriptionFocused}
          extraClass={classes.fullInputWidth}
          isRequired
        />
        {/* Submit button with loading state */}
        <Button
          className={`${classes.button} ${isLoading[FETCH] ? "loading" : ""}`}
          onClick={generateHandler}
        >
          {isLoading[FETCH]
            ? CONTENT.QUEST.input.button.loading
            : CONTENT.QUEST.input.button.default}
          <i className="bi bi-question-circle" />
        </Button>

        {/* Display generated questions */}
        <QuestionsDisplay />
      </form>
    </section>
  );
};

QuestionsGenerator.displayName = "QuestionsGenerator";
export default QuestionsGenerator;
