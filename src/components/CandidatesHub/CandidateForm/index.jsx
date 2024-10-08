import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../../hooks";
import AutoSuggestion from "./AutoSuggestion";
import Skills from "../../Atoms/Skills";
import Button from "../../Atoms/Button";
import Input from "../../Atoms/Input";
import StatusMessage from "../../Atoms/StatusMessage";
import { loadingActions, statusActions, uiActions } from "../../../store";
import {
  arraysEqual,
  candidateValidations,
  editCandidate,
  fetchSuggestedSkills,
  resetStatusAsync,
  transformExperience,
  transformPhoneNumber,
} from "../../../utilities";
import { CONTENT, ROUTES, STATUS_CODES } from "../../../constants";
import classes from "./index.module.scss";

/**
 * CandidateForm Component
 *
 * Allows users to view and edit candidate information,
 * including personal details and skills. It handles form validation,
 * manages the state of form fields, and submits updated candidate data
 * to the server. The component also provides feedback messages to the user
 * based on the success or failure of actions taken within the form.
 *
 * @returns {JSX.Element} - Rendered CandidateForm component.
 */
const CandidateForm = () => {
  const { candidateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { candidates } = useSelector((state) => state.data);
  const { isButtonLoading: isLoading } = useSelector((state) => state.loading);

  // Fetch candidate information based on the candidateId
  const info = candidates.find((candidate) => candidate.id === +candidateId);

  const [localSkills, setLocalSkills] = useState(info?.skills);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Redirect to the candidates list if the edit route is accessed directly because candidate details are only fetched on the candidates page, not when accessing the edit route directly.
  useEffect(() => {
    if (!info) navigate(ROUTES.HOME);
  }, [info, navigate]);

  /**
   * Handle adding a new skill to the localSkills state.
   * Validates the skill and checks for duplicates before adding.
   * @param {string} newSkill - The skill to be added.
   */
  const handleAddSkill = async (newSkill) => {
    await dispatch(resetStatusAsync(statusActions.resetStatus));

    let skillError = "";

    // Validate skill input
    if (localSkills.includes(newSkill.trim())) {
      skillError = CONTENT.candidateHub.candidateForm.errors.skill.existing;
    }

    // If there's an error, reset input and show status message
    if (skillError) {
      dispatch(
        statusActions.updateStatus({ message: skillError, type: "failure" })
      );
      resetSkillValue();
      setShowSuggestions(false);
      return;
    }

    // Update local skills state
    setLocalSkills((prevSkills) => [newSkill, ...prevSkills]);
    resetSkillValue();
    setShowSuggestions(false);
  };

  /**
   * Handle removing a skill from localSkills state.
   * @param {number} skillIndex - The index of the skill to be removed.
   */
  const handleRemoveSkill = (skillIndex) => {
    const updatedSkills = localSkills.filter(
      (_, index) => index !== skillIndex
    );

    // Update the state with the new skills list
    setLocalSkills(updatedSkills);
  };

  /**
   * Close the candidate form and navigate back to the previous route.
   */
  const handleClose = () => {
    navigate("..");
  };

  // Input state management for various candidate fields
  const {
    value: nameValue,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    error: nameError,
  } = useInput(info?.name, (value) =>
    candidateValidations.name(info?.name, value)
  );

  const {
    value: phoneValue,
    handleInputChange: handlePhoneChange,
    handleInputBlur: handlePhoneBlur,
    error: phoneError,
  } = useInput(
    info?.phone_numbers,
    (value) => candidateValidations.phone(info?.phone_numbers, value),
    transformPhoneNumber
  );

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    error: emailError,
  } = useInput(info?.email, (value) =>
    candidateValidations.email(info?.email, value)
  );

  const {
    value: skillValue,
    handleInputChange: handleSkillChange,
    handleInputBlur: handleSkillBlur,
    resetValue: resetSkillValue,
  } = useInput("");

  const {
    value: linkedInValue,
    handleInputChange: handleLinkedInChange,
    handleInputBlur: handleLinkedInBlur,
    error: linkedInError,
  } = useInput(info?.linkedin, (value) =>
    candidateValidations.linkedIn(info?.linkedin, value)
  );

  const {
    value: cityValue,
    handleInputChange: handleCityChange,
    handleInputBlur: handleCityBlur,
    error: cityError,
  } = useInput(info?.location, (value) =>
    candidateValidations.city(info?.location, value)
  );

  const {
    value: stateValue,
    handleInputChange: handleStateChange,
    handleInputBlur: handleStateBlur,
    error: stateError,
  } = useInput(info?.region, (value) =>
    candidateValidations.state(info?.region, value)
  );

  const {
    value: experienceValue,
    handleInputChange: handleExperienceChange,
    handleInputBlur: handleExperienceBlur,
    error: experienceError,
  } = useInput(
    info?.total_experience,
    (value) => candidateValidations.experience(info?.total_experience, value),
    transformExperience
  );

  /**
   * Prevent form submission when Enter key is pressed.
   * @param {KeyboardEvent} event - The keyboard event triggered on key press.
   */
  const preventSubmitOnEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  /**
   * Add a skill when Enter key is pressed in the skill input field.
   * @param {KeyboardEvent} event - The keyboard event triggered on key press.
   */
  const addSkillOnEnter = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      setShowSuggestions(!!skillValue);

      if (!!skillValue) {
        dispatch(loadingActions.enableFetchLoading());
        const { status, data } = await fetchSuggestedSkills();

        if (status === STATUS_CODES.SUCCESS) {
          setSuggestions(data);
        } else {
          setShowSuggestions(false);
          resetSkillValue();
          dispatch(
            statusActions.updateStatus({
              message: CONTENT.serverError,
              type: "failure",
            })
          );
        }
      }

      dispatch(loadingActions.disableFetchLoading());
    }
  };

  /**
   * Check if form values have changed compared to the original candidate info.
   * @returns {boolean} - Returns true if any form value has changed.
   */
  const hasFormChanged = () => {
    return (
      nameValue !== info?.name ||
      phoneValue?.replace(/\D/g, "") !== info?.phone_numbers ||
      emailValue !== info?.email ||
      linkedInValue !== info?.linkedin ||
      cityValue !== info?.location ||
      stateValue !== info?.region ||
      experienceValue !== info?.total_experience ||
      !arraysEqual(localSkills, info?.skills)
    );
  };

  /**
   * Check for validation errors across form fields.
   * @returns {boolean} - Returns true if any validation error exists.
   */
  const hasValidationErrors = () => {
    return [
      nameError,
      phoneError,
      emailError,
      linkedInError,
      cityError,
      stateError,
      experienceError,
    ].some(Boolean);
  };

  // Enable save button only if the form has changed and there are no validation errors
  const enableSave = hasFormChanged() && !hasValidationErrors();

  /**
   * Handle form submission, performing necessary validations and sending data to the server.
   * @param {Event} event - The form submission event.
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    dispatch(loadingActions.enableButtonLoading());

    const form = event.currentTarget;
    const formData = new FormData(form);

    const formValues = new FormData();
    const fields = {
      name: nameValue,
      phone_numbers: phoneValue.replace(/\D/g, ""),
      email: emailValue,
      linkedin: linkedInValue,
      location: cityValue,
      region: stateValue,
      total_experience: +experienceValue,
    };

    // Check changed values
    for (const [key, value] of Object.entries(fields)) {
      if (value !== info?.[key]) {
        formValues.append(key, value);
      }
    }

    // Special handling for skills array comparison
    if (!arraysEqual(localSkills, info?.skills)) {
      formValues.append("skills", formData.get("skills"));
    }

    if (
      formValues.has("name") ||
      formValues.has("phone_numbers") ||
      formValues.has("email") ||
      formValues.has("skills") ||
      formValues.has("linkedin") ||
      formValues.has("location") ||
      formValues.has("region") ||
      formValues.has("total_experience")
    ) {
      const { status } = await editCandidate(info.id, formValues);

      if (status === STATUS_CODES.SUCCESS) {
        dispatch(uiActions.enableRefetch());
        dispatch(
          statusActions.updateStatus({
            message:
              CONTENT.candidateHub.candidateForm.errors.formEditRequest.success,
            type: "success",
          })
        );
      } else {
        dispatch(
          statusActions.updateStatus({
            message: CONTENT.serverError,
            type: "failure",
          })
        );
      }
    }
    handleClose();
    dispatch(loadingActions.disableButtonLoading());
  };
  /**
   * Create a new skill when the create skill button is clicked.
   *
   * @param {MouseEvent} event - The mouse event triggered on button click.
   *
   * This function prevents the default form submission, logs the current skill value,
   * Adds the skill using `handleAddSkill`, and then resets the input field.
   */
  const handleCreateSkill = (event) => {
    event.preventDefault();

    handleAddSkill(skillValue);
    resetSkillValue();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={classes.candidateFormContainer}
    >
      <StatusMessage />
      <div className={classes.candidateForm}>
        <div className={classes.inputColumns}>
          <div>
            <Input
              id="name"
              name="name"
              placeholder={CONTENT.candidateHub.candidateForm.placeholders.name}
              value={nameValue}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyDown={preventSubmitOnEnter}
              error={nameError}
              leftIcon={<i className="bi bi-person-circle" />}
            />

            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder={
                CONTENT.candidateHub.candidateForm.placeholders.phoneNumber
              }
              value={phoneValue}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              onKeyDown={preventSubmitOnEnter}
              error={phoneError}
              leftIcon={<i className="bi bi-telephone-fill" />}
            />

            <Input
              id="email"
              name="email"
              type="email"
              placeholder={
                CONTENT.candidateHub.candidateForm.placeholders.email
              }
              value={emailValue}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              onKeyDown={preventSubmitOnEnter}
              error={emailError}
              leftIcon={<i className="bi bi-envelope-fill" />}
            />

            <Input
              id="addSkill"
              name="addSkill"
              placeholder={
                CONTENT.candidateHub.candidateForm.placeholders.skill
              }
              value={skillValue}
              onChange={handleSkillChange}
              onBlur={handleSkillBlur}
              onKeyDown={addSkillOnEnter}
              leftIcon={<i className="bi bi-tools" />}
            />
            {showSuggestions && (
              <AutoSuggestion
                createSkill={handleCreateSkill}
                addSkill={handleAddSkill}
                disableCreate={!skillValue}
                suggestions={suggestions}
              />
            )}
          </div>

          <div>
            <Input
              id="linkedIn"
              name="linkedIn"
              placeholder={
                CONTENT.candidateHub.candidateForm.placeholders.linkedInUrl
              }
              value={linkedInValue}
              onChange={handleLinkedInChange}
              onBlur={handleLinkedInBlur}
              onKeyDown={preventSubmitOnEnter}
              error={linkedInError}
              leftIcon={<i className="bi bi-linkedin" />}
            />

            <Input
              id="city"
              name="city"
              placeholder={CONTENT.candidateHub.candidateForm.placeholders.city}
              value={cityValue}
              onChange={handleCityChange}
              onBlur={handleCityBlur}
              onKeyDown={preventSubmitOnEnter}
              error={cityError}
              leftIcon={<i className="bi bi-geo-alt-fill" />}
            />

            <Input
              id="state"
              name="state"
              placeholder={
                CONTENT.candidateHub.candidateForm.placeholders.state
              }
              value={stateValue}
              onChange={handleStateChange}
              onBlur={handleStateBlur}
              onKeyDown={preventSubmitOnEnter}
              error={stateError}
              leftIcon={<i className="bi bi-map-fill" />}
            />

            <Input
              id="experience"
              name="experience"
              type="number"
              placeholder={
                CONTENT.candidateHub.candidateForm.placeholders.experience
              }
              value={experienceValue}
              onChange={handleExperienceChange}
              onBlur={handleExperienceBlur}
              onKeyDown={preventSubmitOnEnter}
              error={experienceError}
              leftIcon={<i className="bi bi-briefcase-fill" />}
            />
          </div>
        </div>
        <Input
          id="skills"
          type="hidden"
          name="skills"
          value={localSkills?.join(", ")}
          className={classes.hiddenInput}
        />

        <div className={classes.buttonGroup}>
          <Button
            title="Close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            {CONTENT.candidateHub.candidateForm.button.close}
          </Button>
          <Button
            title="Save"
            className={`${classes.saveButton} ${isLoading ? "loading" : ""}`}
            disabled={!enableSave}
          >
            {isLoading
              ? CONTENT.candidateHub.candidateForm.button.save.loading
              : CONTENT.candidateHub.candidateForm.button.save.default}
          </Button>
        </div>
      </div>
      <div className={classes.skillsSection}>
        <div className={classes.skillsContainer}>
          <Skills
            skills={localSkills}
            isEditable={true}
            removeHandler={handleRemoveSkill}
          />
        </div>
      </div>
    </form>
  );
};

CandidateForm.displayName = "CandidateForm";
export default CandidateForm;
