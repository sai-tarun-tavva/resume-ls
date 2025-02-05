import { useDispatch, useSelector } from "react-redux";
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
  QUEST,
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
  const { jobDescription, callStatus } = useSelector((state) => state.result);
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
  } = useInput(
    jobDescription,
    questValidations.jobDescription,
    undefined,
    true
  );

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
    dispatch(resultActions.resetState());

    // Prevent duplicate fetch calls during loading
    if (isLoading[FETCH]) return;

    if (!jobDescriptionValue) {
      // Force validation if input is empty
      forceJobDescriptionValidations();
    } else {
      enableFetchLoading();

      try {
        const payload = { job_description: jobDescriptionValue };

        const { status, data } = await generateQuestions(payload);

        if (status === STATUS_CODES.SUCCESS) {
          dispatch(resultActions.updateQuestions(data.questions));
          dispatch(resultActions.updateSessionID(data.session_id));
        } else {
          dispatch(resultActions.updateQuestions([]));
          dispatch(resultActions.updateSessionID(""));
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
          disabled={callStatus === QUEST.CALL_STATUSES.CALLING}
          value={jobDescriptionValue}
          changeHandler={(event) => {
            jobDescriptionChange(event);
            dispatch(resultActions.updateJobDescription(event.target.value));
          }}
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
          disabled={callStatus === QUEST.CALL_STATUSES.CALLING}
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
