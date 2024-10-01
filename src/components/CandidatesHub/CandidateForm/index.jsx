import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInput } from "../../../hooks";
import Skills from "../../Atoms/Skills";
import Button from "../../Atoms/Button";
import Input from "../../Atoms/Input";
import StatusMessage from "../../Atoms/StatusMessage";
import { DataContext, LoadingContext, StatusMsgContext } from "../../../store";
import {
  arraysEqual,
  candidateValidations,
  transformExperience,
  transformPhoneNumber,
} from "../../../utilities";
import { END_POINTS, ROUTES, content } from "../../../constants";
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
  const { handleViewStatus } = useContext(StatusMsgContext);
  const {
    isSendingPostPatchRequest: isLoading,
    handleToggleSendingPostPatchRequest: setLoading,
  } = useContext(LoadingContext);
  const { filteredCandidateData, onUpdateSingleDataItem } =
    useContext(DataContext);

  // Fetch candidate information based on the candidateId
  const info = filteredCandidateData.find(
    (candidate) => candidate.id === +candidateId
  );

  const [localSkills, setLocalSkills] = useState(info?.skills);

  // Redirect to the candidates list if the edit route is accessed directly because candidate details are only fetched on the candidates page, not when accessing the edit route directly.
  useEffect(() => {
    if (!info) navigate(ROUTES.HOME);
  }, [info, navigate]);

  /**
   * Handle adding a new skill to the localSkills state.
   * Validates the skill and checks for duplicates before adding.
   * @param {string} newSkill - The skill to be added.
   */
  const handleAddSkill = (newSkill) => {
    const lowerCaseSkill = newSkill.trim().toLowerCase();
    let skillError = "";

    // Validate skill input
    if (!lowerCaseSkill) {
      skillError = content.candidateHub.candidateForm.errors.skill.empty;
    } else if (localSkills.includes(lowerCaseSkill)) {
      skillError = content.candidateHub.candidateForm.errors.skill.existing;
    }

    // If there's an error, reset input and show status message
    if (skillError) {
      resetSkillValue();
      handleViewStatus(skillError, "failure");
      return;
    }

    // Update local skills state
    setLocalSkills((prevSkills) => [lowerCaseSkill, ...prevSkills]);
    resetSkillValue();
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
  const addSkillOnEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddSkill(event.target.value);
    }
  };

  /**
   * Check if form values have changed compared to the original candidate info.
   * @returns {boolean} - Returns true if any form value has changed.
   */
  const hasFormChanged = () => {
    return (
      nameValue !== info?.name ||
      phoneValue !== info?.phone_numbers ||
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

    setLoading();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const formValues = {
      name: formData.get("name"),
      phone_numbers: formData.get("phoneNumber"),
      email: formData.get("email"),
      location: formData.get("city"),
      region: formData.get("state"),
      linkedin: formData.get("linkedIn"),
      skills: formData.get("skills"),
      total_experience: +formData.get("experience"),
    };

    // Temporary: Prepare local values for context update
    const localValues = {
      id: info?.id,
      name: nameValue,
      phone_numbers: phoneValue,
      email: emailValue,
      location: cityValue,
      region: stateValue,
      linkedin: linkedInValue,
      skills: localSkills?.join(", "),
      total_experience: experienceValue,
      file_path: info?.file_path || "",
    };

    if (enableSave) {
      try {
        // Make the API request to update candidate data
        const response = await fetch(END_POINTS.EDIT_CANDIDATE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        // Handle response from the server
        if (response.ok) {
          // Update candidate data in context
          onUpdateSingleDataItem(localValues);
          handleViewStatus(
            content.candidateHub.candidateForm.errors.formEditRequest.success,
            "success"
          );
        } else {
          // Handle server error response
          handleViewStatus(
            content.candidateHub.candidateForm.errors.formEditRequest.failure,
            "failure"
          );
        }
      } catch (error) {
        // Handle fetch error
        handleViewStatus(
          content.candidateHub.candidateForm.errors.formEditRequest.network,
          "failure"
        );
      } finally {
        handleClose();
        setLoading();
      }
    }
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
              placeholder={content.candidateHub.candidateForm.placeholders.name}
              value={nameValue}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyDown={preventSubmitOnEnter}
              error={nameError}
              leftIcon={<i className="bi bi-person-circle"></i>}
            />

            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder={
                content.candidateHub.candidateForm.placeholders.phoneNumber
              }
              value={phoneValue}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              onKeyDown={preventSubmitOnEnter}
              error={phoneError}
              leftIcon={<i className="bi bi-telephone-fill"></i>}
            />

            <Input
              id="email"
              name="email"
              type="email"
              placeholder={
                content.candidateHub.candidateForm.placeholders.email
              }
              value={emailValue}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              onKeyDown={preventSubmitOnEnter}
              error={emailError}
              leftIcon={<i className="bi bi-envelope-fill"></i>}
            />

            <Input
              id="addSkill"
              name="addSkill"
              placeholder={
                content.candidateHub.candidateForm.placeholders.skill
              }
              value={skillValue}
              onChange={handleSkillChange}
              onBlur={handleSkillBlur}
              onKeyDown={addSkillOnEnter}
              leftIcon={<i className="bi bi-lightbulb-fill"></i>}
            />
          </div>

          <div>
            <Input
              id="linkedIn"
              name="linkedIn"
              placeholder={
                content.candidateHub.candidateForm.placeholders.linkedInUrl
              }
              value={linkedInValue}
              onChange={handleLinkedInChange}
              onBlur={handleLinkedInBlur}
              onKeyDown={preventSubmitOnEnter}
              error={linkedInError}
              leftIcon={<i className="bi bi-linkedin"></i>}
            />

            <Input
              id="city"
              name="city"
              placeholder={content.candidateHub.candidateForm.placeholders.city}
              value={cityValue}
              onChange={handleCityChange}
              onBlur={handleCityBlur}
              onKeyDown={preventSubmitOnEnter}
              error={cityError}
              leftIcon={<i className="bi bi-geo-alt-fill"></i>}
            />

            <Input
              id="state"
              name="state"
              placeholder={
                content.candidateHub.candidateForm.placeholders.state
              }
              value={stateValue}
              onChange={handleStateChange}
              onBlur={handleStateBlur}
              onKeyDown={preventSubmitOnEnter}
              error={stateError}
              leftIcon={<i className="bi bi-map-fill"></i>}
            />

            <Input
              id="experience"
              name="experience"
              type="number"
              placeholder={
                content.candidateHub.candidateForm.placeholders.experience
              }
              value={experienceValue}
              onChange={handleExperienceChange}
              onBlur={handleExperienceBlur}
              onKeyDown={preventSubmitOnEnter}
              error={experienceError}
              leftIcon={<i className="bi bi-briefcase-fill"></i>}
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
            {content.candidateHub.candidateForm.button.close}
          </Button>
          <Button
            title="Save"
            className={`${classes.saveButton} ${isLoading ? "loading" : ""}`}
            disabled={!enableSave}
          >
            {isLoading
              ? content.candidateHub.candidateForm.button.save.loading
              : content.candidateHub.candidateForm.button.save.default}
          </Button>
        </div>
      </div>
      <div className={classes.skillsSection}>
        <div className={classes.skillsContainer}>
          <Skills
            skills={localSkills}
            isEditable={true}
            onClick={handleRemoveSkill}
          />
        </div>
      </div>
    </form>
  );
};

CandidateForm.displayName = "CandidateForm";
export default CandidateForm;
