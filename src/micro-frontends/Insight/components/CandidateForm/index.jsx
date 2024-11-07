import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../../Atoms/hooks";
import AutoSuggestion from "./AutoSuggestion";
import Skills from "../../../Atoms/components/Skills";
import Button from "../../../Atoms/components/Button";
import InputV1 from "../../../Atoms/components/Inputs/InputV1";
import { uiActions } from "../../store";
import { useLoading, useStatus } from "../../../../store";
import {
  arraysEqual,
  candidateValidations,
  createNewSkill,
  editCandidate,
  fetchSuggestedSkills,
  dispatchAsync,
  transformExperience,
  transformPhoneNumber,
} from "../../../../utilities";
import {
  CONTENT,
  LOADING_ACTION_TYPES,
  ROUTES,
  STATUS_CODES,
} from "../../../../constants";
import classes from "./index.module.scss";

const { BUTTON } = LOADING_ACTION_TYPES;

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
  const {
    isLoading,
    enableFetchLoading,
    disableFetchLoading,
    enableButtonLoading,
    disableButtonLoading,
  } = useLoading();
  const { updateStatus, resetStatus } = useStatus();

  // Fetch candidate information based on the candidateId
  const info = candidates.find((candidate) => candidate.id === +candidateId);

  const [localSkills, setLocalSkills] = useState(info?.skills);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const autoSuggestRef = useRef(null);

  // Redirect to the candidates list if the edit route is accessed directly because candidate details are only fetched on the candidates page, not when accessing the edit route directly.
  useEffect(() => {
    if (!info) navigate(ROUTES.INSIGHT.HOME);
  }, [info, navigate]);

  // Executes whenever user clicks on the screen
  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * Hide suggestions if user clicks outside of it.
   * @param {KeyboardEvent} event - The keyboard event triggered on key press.
   */
  const handleClickOutside = (event) => {
    // Check if the click is outside the auto-suggestion
    if (
      autoSuggestRef.current &&
      !autoSuggestRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }
  };

  /**
   * Handle adding a new skill to the localSkills state.
   * Validates the skill and checks for duplicates before adding.
   * @param {string} newSkill - The skill to be added.
   */
  const handleAddSkill = async (newSkill) => {
    await dispatchAsync(resetStatus);

    let skillError = "";

    // Validate skill input
    if (localSkills.includes(newSkill.trim())) {
      skillError = CONTENT.INSIGHT.statusMessages.skill.existing;
    }

    // If there's an error, reset input and show status message
    if (skillError) {
      updateStatus({ message: skillError, type: "failure" });
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
        enableFetchLoading();
        const { status, data } = await fetchSuggestedSkills(skillValue);

        if (status === STATUS_CODES.SUCCESS) {
          setSuggestions(data);
        } else {
          setShowSuggestions(false);
          resetSkillValue();
          updateStatus({
            message: CONTENT.COMMON.serverError,
            type: "failure",
          });
        }
      }

      disableFetchLoading();
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
    if (isLoading[BUTTON]) return;

    enableButtonLoading();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const formValues = new FormData();
    const fields = {
      name: nameValue.trim(),
      phone_numbers: phoneValue.replace(/\D/g, "").trim(),
      email: emailValue.trim(),
      linkedin: linkedInValue.trim(),
      location: cityValue.trim(),
      region: stateValue.trim(),
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
        updateStatus({
          message: CONTENT.INSIGHT.statusMessages.form.success,
          type: "success",
        });
      } else {
        updateStatus({
          message: CONTENT.COMMON.serverError,
          type: "failure",
        });
      }
    }
    handleClose();
    disableButtonLoading();
  };
  /**
   * Create a new skill when the create skill button is clicked.
   *
   * @param {MouseEvent} event - The mouse event triggered on button click.
   *
   * This function prevents the default form submission, logs the current skill value,
   * Adds the skill using `handleAddSkill`, and then resets the input field.
   */
  const handleCreateSkill = async (event) => {
    event.preventDefault();

    const { status } = await createNewSkill({ skills: [skillValue.trim()] });

    if (status === STATUS_CODES.SUCCESS) {
      handleAddSkill(skillValue);
      resetSkillValue();
      updateStatus({
        message: `"${skillValue}"${CONTENT.INSIGHT.statusMessages.skill.added}`,
        type: "success",
      });
    } else {
      updateStatus({
        message: CONTENT.COMMON.serverError,
        type: "failure",
      });
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={classes.candidateFormContainer}
    >
      <div className={classes.candidateForm}>
        <div className={classes.inputColumns}>
          <div>
            <InputV1
              id="name"
              name="name"
              placeholder={CONTENT.INSIGHT.candidateForm.placeholders.name}
              value={nameValue}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyDown={preventSubmitOnEnter}
              error={nameError}
              leftIcon={<i className="bi bi-person-circle" />}
              extraClassControl={classes.candidateControl}
            />

            <InputV1
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder={
                CONTENT.INSIGHT.candidateForm.placeholders.phoneNumber
              }
              value={phoneValue}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              onKeyDown={preventSubmitOnEnter}
              error={phoneError}
              leftIcon={<i className="bi bi-telephone-fill" />}
              extraClassControl={classes.candidateControl}
            />

            <InputV1
              id="email"
              name="email"
              type="email"
              placeholder={CONTENT.INSIGHT.candidateForm.placeholders.email}
              value={emailValue}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              onKeyDown={preventSubmitOnEnter}
              error={emailError}
              leftIcon={<i className="bi bi-envelope-fill" />}
              extraClassControl={classes.candidateControl}
            />

            <InputV1
              id="addSkill"
              name="addSkill"
              placeholder={CONTENT.INSIGHT.candidateForm.placeholders.skill}
              value={skillValue}
              onChange={handleSkillChange}
              onBlur={handleSkillBlur}
              onKeyDown={addSkillOnEnter}
              leftIcon={<i className="bi bi-tools" />}
              extraClassControl={classes.candidateControl}
            />
            {showSuggestions && (
              <div ref={autoSuggestRef}>
                <AutoSuggestion
                  createSkill={handleCreateSkill}
                  addSkill={handleAddSkill}
                  disableCreate={!skillValue}
                  suggestions={suggestions}
                />
              </div>
            )}
          </div>

          <div>
            <InputV1
              id="linkedIn"
              name="linkedIn"
              placeholder={
                CONTENT.INSIGHT.candidateForm.placeholders.linkedInUrl
              }
              value={linkedInValue}
              onChange={handleLinkedInChange}
              onBlur={handleLinkedInBlur}
              onKeyDown={preventSubmitOnEnter}
              error={linkedInError}
              leftIcon={<i className="bi bi-linkedin" />}
              extraClassControl={classes.candidateControl}
            />

            <InputV1
              id="city"
              name="city"
              placeholder={CONTENT.INSIGHT.candidateForm.placeholders.city}
              value={cityValue}
              onChange={handleCityChange}
              onBlur={handleCityBlur}
              onKeyDown={preventSubmitOnEnter}
              error={cityError}
              leftIcon={<i className="bi bi-geo-alt-fill" />}
              extraClassControl={classes.candidateControl}
            />

            <InputV1
              id="state"
              name="state"
              placeholder={CONTENT.INSIGHT.candidateForm.placeholders.state}
              value={stateValue}
              onChange={handleStateChange}
              onBlur={handleStateBlur}
              onKeyDown={preventSubmitOnEnter}
              error={stateError}
              leftIcon={<i className="bi bi-map-fill" />}
              extraClassControl={classes.candidateControl}
            />

            <InputV1
              id="experience"
              name="experience"
              type="number"
              placeholder={
                CONTENT.INSIGHT.candidateForm.placeholders.experience
              }
              value={experienceValue}
              onChange={handleExperienceChange}
              onBlur={handleExperienceBlur}
              onKeyDown={preventSubmitOnEnter}
              error={experienceError}
              leftIcon={<i className="bi bi-briefcase-fill" />}
              extraClassControl={classes.candidateControl}
            />
          </div>
        </div>
        <InputV1
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
            {CONTENT.INSIGHT.candidateForm.button.close}
          </Button>
          <Button
            title="Save"
            className={`${classes.saveButton} ${
              isLoading[BUTTON] ? "loading" : ""
            }`}
            disabled={!enableSave}
          >
            {isLoading[BUTTON]
              ? CONTENT.INSIGHT.candidateForm.button.save.loading
              : CONTENT.INSIGHT.candidateForm.button.save.default}
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
