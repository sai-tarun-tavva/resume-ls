import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInput } from "../../../hooks";
import Skills from "../../Atoms/Skills";
import Button from "../../Atoms/Button";
import Input from "../../Atoms/Input";
import StatusMessage from "../../Atoms/StatusMessage";
import { DataContext, LoadingContext, StatusMsgContext } from "../../../store";
import {
  arraysEqual,
  transformExperience,
  transformPhoneNumber,
  candidateValidations,
} from "../../../utilities";
import styles from "./index.module.css";

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
    if (!info) navigate("candidates");
  }, [info, navigate]);

  const handleAddSkill = (newSkill) => {
    const lowerCaseSkill = newSkill.trim().toLowerCase();

    let skillError = "";

    if (!lowerCaseSkill) skillError = "Cannot add empty skill.";
    if (localSkills.includes(lowerCaseSkill))
      skillError = "Skill already exists.";

    if (skillError) {
      resetSkillValue();
      handleViewStatus(skillError, "error");
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
        const response = await fetch(
          "https://something.free.beeceptor.com/home/resume/edit/8",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues),
          }
        );

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
      className={styles["candidate-form-container"]}
    >
      <StatusMessage />
      <div className={styles["candidate-form"]}>
        <div className={styles["input-columns"]}>
          <div>
            <Input
              label="name"
              id="name"
              name="name"
              value={nameValue}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              error={nameError}
            />

            <Input
              label="phone number"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="xxx xxx xxxx"
              type="tel"
              value={phoneValue}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              error={phoneError}
            />

            <Input
              label="email"
              id="email"
              name="email"
              type="email"
              value={emailValue}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              error={emailError}
            />

            <Input
              label="add skill"
              id="addSkill"
              name="addSkill"
              value={skillValue}
              onChange={handleSkillChange}
              onBlur={handleSkillBlur}
              onKeyDown={(event) => {
                // custom feature
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleAddSkill(event.target.value);
                }
              }}
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
              error={linkedInError}
            />

            <Input
              label="city"
              id="city"
              name="city"
              value={cityValue}
              onChange={handleCityChange}
              onBlur={handleCityBlur}
              error={cityError}
            />

            <Input
              label="state"
              id="state"
              name="state"
              value={stateValue}
              onChange={handleStateChange}
              onBlur={handleStateBlur}
              error={stateError}
            />

            <Input
              label="experience in years"
              id="experience"
              name="experience"
              type="number"
              value={experienceValue}
              onChange={handleExperienceChange}
              onBlur={handleExperienceBlur}
              error={experienceError}
            />
          </div>
        </div>
        <Input
          type="hidden"
          name="skills"
          value={localSkills?.join(", ")}
          className={styles["hidden-input"]}
        />

        <div className={styles["button-group"]}>
          <Button
            title="Close"
            className={styles["close-button"]}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            title="Save"
            className={`${styles["save-button"]} ${isLoading ? "loading" : ""}`}
            disabled={!enableSave}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
      <div className={styles["skills-section"]}>
        <div className={styles["skills-container"]}>
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
