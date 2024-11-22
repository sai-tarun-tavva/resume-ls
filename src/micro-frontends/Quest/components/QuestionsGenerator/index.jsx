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

const QuestionsGenerator = () => {
  const dispatch = useDispatch();
  const { isLoading, enableFetchLoading, disableFetchLoading } = useLoading();
  const { updateStatus, resetStatus } = useStatus();

  const {
    value: jobDescriptionValue,
    handleInputChange: jobDescriptionChange,
    handleInputBlur: jobDescriptionBlur,
    handleInputFocus: jobDescriptionFocus,
    error: jobDescriptionError,
    isFocused: isJobDescriptionFocused,
    forceValidations: forceJobDescriptionValidations,
  } = useInput("", questValidations.jobDescription, undefined, true);

  const generateHandler = async (event) => {
    event.preventDefault();
    await dispatchAsync(resetStatus);
    if (isLoading[FETCH]) return;

    if (!jobDescriptionValue) forceJobDescriptionValidations();
    else {
      enableFetchLoading();
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
      disableFetchLoading();
    }
  };

  return (
    <section className={classes.generatorContainer}>
      <form>
        <Textarea
          id="description"
          label="Job Description"
          value={jobDescriptionValue}
          changeHandler={jobDescriptionChange}
          blurHandler={jobDescriptionBlur}
          focusHandler={jobDescriptionFocus}
          error={jobDescriptionError}
          isFocused={isJobDescriptionFocused}
          extraClass={classes.fullInputWidth}
          isRequired
        />
        <Button
          className={`${classes.button} ${isLoading[FETCH] ? "loading" : ""}`}
          onClick={generateHandler}
        >
          {isLoading[FETCH] ? "Generating..." : "Generate Questions"}
          <i className="bi bi-question-circle" />
        </Button>

        <QuestionsDisplay />
      </form>
    </section>
  );
};

QuestionsGenerator.displayName = "QuestionsGenerator";
export default QuestionsGenerator;
