import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../../Atoms/hooks";
import AutoSuggestion from "./AutoSuggestion";
import Skills from "../../../Atoms/components/Skills";
import Button from "../../../Atoms/components/Button";
import InputV1 from "../../../Atoms/components/Inputs/InputV1";
import { dataActions } from "../../store";
import { useLoading, useStatus, useUI } from "../../../../store";
import {
  arraysEqual,
  candidateValidations,
  createNewSkill,
  editCandidate,
  fetchSuggestedSkills,
  filterSkills,
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
 * Allows users to view and edit candidate information, including personal details and skills.
 * Handles form validation, manages state of form fields, and submits updates to the server.
 *
 * @returns {JSX.Element} - Rendered CandidateForm component.
 */
const CandidateForm = () => {
  const { candidateId } = useParams();
  const routeLocation = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { candidates, skills: globalFetchedSkills } = useSelector(
    (state) => state.data
  );
  const { isLoading, enableButtonLoading, disableButtonLoading } = useLoading();
  const { updateStatus, resetStatus } = useStatus();
  const { enableRefetch } = useUI();

  // Fetch candidate information based on the candidateId
  const info = candidates.find((candidate) => candidate.id === +candidateId);

  const [localSkills, setLocalSkills] = useState(info?.skills);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const autoSuggestRef = useRef(null);

  /**
   * Hides skill suggestions when user clicks outside the suggestion box.
   *
   * @param {MouseEvent} event - The click event.
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
   * Adds a new skill to the localSkills state after validation.
   *
   * @param {string} newSkill - The skill to be added.
   */
  const handleAddSkill = async (newSkill) => {
    await dispatchAsync(resetStatus);

    let skillError = "";

    // Validate skill input
    if (
      localSkills
        .map((skill) => skill.toLowerCase())
        .includes(newSkill.trim().toLowerCase())
    ) {
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
   * Removes a skill from the localSkills state by index.
   *
   * @param {number} skillIndex - Index of the skill to remove.
   */
  const handleRemoveSkill = (skillIndex) => {
    const updatedSkills = localSkills.filter(
      (_, index) => index !== skillIndex
    );

    // Update the state with the new skills list
    setLocalSkills(updatedSkills);
  };

  /**
   * Closes the candidate form and navigates to the previous route.
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
    transformPhoneNumber(info?.phone_numbers),
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
   * Dynamically displays skill suggestions based on skill input value.
   */
  const displayDynamicSuggestions = useCallback(() => {
    setShowSuggestions(!!skillValue);

    if (!!skillValue) {
      setSuggestions(filterSkills(skillValue, globalFetchedSkills));
    }
  }, [skillValue, globalFetchedSkills]);

  /**
   * Prevents form submission on Enter key in input fields.
   *
   * @param {KeyboardEvent} event - The keydown event.
   */
  const preventSubmitOnEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  /**
   * Checks if form values have changed from the original candidate information.
   *
   * @returns {boolean} - True if form values differ from original data.
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
   * Checks for validation errors across all form fields.
   *
   * @returns {boolean} - True if there are validation errors.
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
   * Submits updated candidate data to the server after validation.
   *
   * @param {Event} event - Form submission event.
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
        enableRefetch();
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
   * Creates a new skill and adds it to the skills list.
   *
   * @param {MouseEvent} event - Click event on create skill button.
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

  // Redirect to the not found page if the edit route is accessed directly because candidate details are only fetched on the candidates page, not when accessing the edit route directly.
  useEffect(() => {
    if (!info)
      navigate(ROUTES.COMMON.NOT_FOUND, {
        state: { from: routeLocation.pathname },
      });
  }, [info, navigate, routeLocation]);

  // Fetches the skills list on mount
  useEffect(() => {
    const fetchSkills = async () => {
      const { status, data } = await fetchSuggestedSkills();

      if (status === STATUS_CODES.SUCCESS) {
        dispatch(dataActions.replaceSkills(data));
      } else {
        updateStatus({
          message: CONTENT.INSIGHT.statusMessages.skill.fetchFail,
          type: "failure",
        });
      }
    };

    fetchSkills();
  }, [dispatch, updateStatus]);

  // Executes whenever user clicks on the screen
  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    displayDynamicSuggestions();
  }, [skillValue, displayDynamicSuggestions]);

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
              onKeyDown={preventSubmitOnEnter}
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
