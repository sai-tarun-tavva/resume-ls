import { useState } from "react";
import { useDispatch } from "react-redux";
import Textarea from "../../../Atoms/components/Inputs/Textarea";
import Select from "../../../Atoms/components/Inputs/Select";
import Upload from "../../../Atoms/components/Inputs/Upload";
import Button from "../../../Atoms/components/Button";
import Actions from "./Actions";
import { useFileInput, useInput } from "../../../Atoms/hooks";
import { useLoading, useStatus } from "../../../../store";
import { resultActions } from "../../store";
import {
  determineSectionValidity,
  makeSuggestions,
  dispatchAsync,
  sparkValidations,
} from "../../../../utilities";
import {
  CONTENT,
  LOADING_ACTION_TYPES,
  STATUS_CODES,
} from "../../../../constants";
import { OPERATION_UI_API_KEYS, SERVICE_TYPE_OPTIONS } from "../../constants";
import classes from "./index.module.scss";

const { FETCH } = LOADING_ACTION_TYPES;

/**
 * Operations Component
 *
 * Handles user input for various operations, including text input, file upload, and action selection.
 * Validates form inputs and triggers suggestions for selected actions.
 *
 * @returns {JSX.Element} The rendered operations component.
 */
const Operations = () => {
  const dispatch = useDispatch();
  const [selectedActions, setSelectedActions] = useState([]);
  const [actionsError, setActionsError] = useState();

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
  } = useInput("", sparkValidations.jobDescription, undefined, true);

  const {
    file: chooseResumeFile,
    handleFileChange: chooseResumeChange,
    handleDrop: chooseResumeDrop,
    handleDragOver: chooseResumeDragOver,
    resetFile: chooseResumeReset,
    error: chooseResumeError,
    forceValidations: forceChooseResumeValidations,
  } = useFileInput(undefined, sparkValidations.uploadResume, true);

  const {
    value: serviceTypeValue,
    handleInputChange: serviceTypeChange,
    handleInputBlur: serviceTypeBlur,
    handleInputFocus: serviceTypeFocus,
    error: serviceTypeError,
    isFocused: isServiceTypeFocused,
    forceValidations: forceServiceTypeValidations,
  } = useInput("", sparkValidations.chooseService, undefined, true);

  /**
   * Validates selected actions, setting an error message if no actions are selected.
   */
  const forceActionsValidations = () => {
    setActionsError(
      selectedActions.length > 0 ? "" : CONTENT.COMMON.errors.actions.empty
    );
  };

  const allErrors = [jobDescriptionError, chooseResumeError, serviceTypeError];
  const allValues = [
    jobDescriptionValue,
    chooseResumeFile,
    serviceTypeValue,
    selectedActions.length > 0,
  ];

  const isSectionValid = determineSectionValidity(allErrors, allValues);

  /**
   * Triggers validation for all input fields and selected actions.
   */
  const forceValidations = () => {
    forceJobDescriptionValidations();
    forceServiceTypeValidations();
    forceChooseResumeValidations();
    forceActionsValidations();
  };

  /**
   * Handles form submission, validating fields and sending form data
   * to generate suggestions for each selected action.
   *
   * @async
   * @param {Event} event - The form submission event.
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await dispatchAsync(resetStatus);

    let succeededAction;

    if (!isSectionValid) {
      forceValidations();
    } else {
      if (isLoading[FETCH]) return;

      enableFetchLoading();
      dispatch(resultActions.resetState());

      for (const action of selectedActions) {
        const formData = new FormData();
        formData.append("description", jobDescriptionValue);
        formData.append("resume", chooseResumeFile);
        formData.append("compare_option", serviceTypeValue);
        formData.append("action", OPERATION_UI_API_KEYS[action]);

        try {
          const { status, data } = await makeSuggestions(formData);

          if (status === STATUS_CODES.SUCCESS) {
            const result = data?.analysis_result;
            const success = data?.success;
            const message = data?.message;

            if (success === false) {
              updateStatus({
                message: message,
                type: "failure",
                darkMode: true,
              });
            } else {
              succeededAction = action;
              dispatch(resultActions.appendState({ action, value: result }));
            }
          } else {
            await dispatchAsync(resetStatus);
            updateStatus({
              message: `Suggestions for ${CONTENT.SPARK.operations.actions.items[action]} failed due to server error.`,
              type: "failure",
              darkMode: true,
            });
          }
        } catch (error) {
          console.error("Error during suggestion request:", error);
          await dispatchAsync(resetStatus);
          updateStatus({
            message: `Suggestions for ${CONTENT.SPARK.operations.actions.items[action]} failed due to error.`,
            type: "failure",
            darkMode: true,
          });
        }
      }

      if (succeededAction) {
        dispatch(resultActions.updateSelectedKey(selectedActions[0]));
      }

      disableFetchLoading();
    }
  };

  return (
    <section className={classes.operations}>
      <form onSubmit={handleFormSubmit}>
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
        <Upload
          id="chooseResume"
          label="Choose a resume"
          file={chooseResumeFile}
          changeHandler={chooseResumeChange}
          dropHandler={chooseResumeDrop}
          dragOverHandler={chooseResumeDragOver}
          resetFile={chooseResumeReset}
          error={chooseResumeError}
          isRequired
        />
        <Select
          id="serviceType"
          label="Choose a service"
          options={SERVICE_TYPE_OPTIONS}
          value={serviceTypeValue}
          changeHandler={serviceTypeChange}
          blurHandler={serviceTypeBlur}
          focusHandler={serviceTypeFocus}
          error={serviceTypeError}
          isFocused={isServiceTypeFocused}
          extraClass={classes.fullInputWidth}
          isRequired
        />
        <Actions
          selectedActions={selectedActions}
          setSelectedActions={setSelectedActions}
          actionsError={actionsError}
          setActionsError={setActionsError}
          isRequired
        />
        <Button
          className={`${classes.button} ${isLoading[FETCH] ? "loading" : ""}`}
        >
          {isLoading[FETCH]
            ? CONTENT.SPARK.operations.button.loading
            : CONTENT.SPARK.operations.button.default}
          <i className="bi bi-rocket-takeoff"></i>
        </Button>
      </form>
    </section>
  );
};

export default Operations;
Operations.displayName = "Operations";
