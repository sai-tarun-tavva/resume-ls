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
import { END_POINTS, ROUTES } from "../../../constants";
import classes from "./index.module.css";

const CandidateForm = () => {
  const { candidateId } = useParams();
  const navigate = useNavigate();
  const { handleViewStatus } = useContext(StatusMsgContext);
  const {
    isSendingPostPatchRequest: isLoading,
    handleSendingPostPatchRequest: setLoading,
  } = useContext(LoadingContext);
  const { filteredCandidateData, onUpdateSingleDataItem } =
    useContext(DataContext);
  const info = filteredCandidateData.find(
    (candidate) => candidate.id === +candidateId
  );

  const [localSkills, setLocalSkills] = useState(info?.skills);

  // Redirect to the candidates list if the edit route is accessed directly because candidate details are only fetched on the candidates page, not when accessing the edit route directly.
  useEffect(() => {
    if (!info) navigate(ROUTES.HOME);
  }, [info, navigate]);

  const handleAddSkill = (newSkill) => {
    const lowerCaseSkill = newSkill.trim().toLowerCase();

    let skillError = "";

    if (!lowerCaseSkill) skillError = "Cannot add empty skill.";
    if (localSkills.includes(lowerCaseSkill))
      skillError = "Skill already exists.";

    if (skillError) {
      resetSkillValue();
      handleViewStatus(skillError, "failure");
      return;
    }

    setLocalSkills((prevSkills) => [lowerCaseSkill, ...prevSkills]);
    resetSkillValue();
  };

  const handleRemoveSkill = (skillIndex) => {
    const updatedSkills = localSkills.filter(
      (_, index) => index !== skillIndex
    );

    setLocalSkills(updatedSkills);
  };

  const handleClose = () => {
    navigate("..");
  };

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

  // Utility function to prevent form submission
  const preventSubmitOnEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  // Utility function to add skill on hitting ENTER in skill input
  const addSkillOnEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddSkill(event.target.value);
    }
  };

  // Utility function to check if form values are unchanged
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

  // Utility function to check for validation errors
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

    // Temporary
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
        // Make the API request
        // Pending change
        const response = await fetch(END_POINTS.EDIT_CANDIDATE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        // Handle response
        if (response.ok) {
          // Call context-provided functions on success
          // const updatedCandidateData = await response.json();
          // Pending change
          onUpdateSingleDataItem(localValues);
          handleViewStatus(
            "Candidate information successfully updated!",
            "success"
          );
        } else {
          // Handle error
          handleViewStatus(
            "Failed to update candidate information. Please try again.",
            "failure"
          );
        }
      } catch (error) {
        // Handle fetch error
        handleViewStatus(
          "Network error. Please check your connection.",
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
              value={nameValue}
              placeholder="name"
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              onKeyDown={preventSubmitOnEnter}
              error={nameError}
              leftIcon={<i class="bi bi-person-circle"></i>}
            />

            <Input
              label="phone number"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="phone number"
              type="tel"
              value={phoneValue}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              onKeyDown={preventSubmitOnEnter}
              error={phoneError}
              leftIcon={<i class="bi bi-telephone-fill"></i>}
            />

            <Input
              label="email"
              id="email"
              name="email"
              type="email"
              placeholder="email"
              value={emailValue}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              onKeyDown={preventSubmitOnEnter}
              error={emailError}
              leftIcon={<i class="bi bi-envelope-fill"></i>}
            />

            <Input
              label="add skill"
              id="addSkill"
              name="addSkill"
              placeholder="skill"
              value={skillValue}
              onChange={handleSkillChange}
              onBlur={handleSkillBlur}
              onKeyDown={addSkillOnEnter}
              leftIcon={<i class="bi bi-lightbulb-fill"></i>}
            />
          </div>

          <div>
            <Input
              label="linkedin url"
              id="linkedIn"
              name="linkedIn"
              placeholder="https://www.linkedin.com/in/your-profile"
              value={linkedInValue}
              onChange={handleLinkedInChange}
              onBlur={handleLinkedInBlur}
              onKeyDown={preventSubmitOnEnter}
              error={linkedInError}
              leftIcon={<i class="bi bi-linkedin"></i>}
            />

            <Input
              label="city"
              id="city"
              name="city"
              value={cityValue}
              placeholder="city"
              onChange={handleCityChange}
              onBlur={handleCityBlur}
              onKeyDown={preventSubmitOnEnter}
              error={cityError}
              leftIcon={<i class="bi bi-geo-alt-fill"></i>}
            />

            <Input
              label="state"
              id="state"
              name="state"
              value={stateValue}
              placeholder="state"
              onChange={handleStateChange}
              onBlur={handleStateBlur}
              onKeyDown={preventSubmitOnEnter}
              error={stateError}
              leftIcon={<i class="bi bi-map-fill"></i>}
            />

            <Input
              label="experience in years"
              id="experience"
              name="experience"
              type="number"
              placeholder="experience"
              value={experienceValue}
              onChange={handleExperienceChange}
              onBlur={handleExperienceBlur}
              onKeyDown={preventSubmitOnEnter}
              error={experienceError}
              leftIcon={<i class="bi bi-briefcase-fill"></i>}
            />
          </div>
        </div>
        <Input
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
            Close
          </Button>
          <Button
            title="Save"
            className={`${classes.saveButton} ${isLoading ? "loading" : ""}`}
            disabled={!enableSave}
          >
            {isLoading ? "Saving..." : "Save"}
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
