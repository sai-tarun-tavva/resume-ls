import React, { useContext, useState } from "react";
import Skills from "../Skills";
import Button from "../../../Atoms/Button";
import Input from "../../../Atoms/Input";
import { useInput } from "../../../../hooks/useInput";
import {
  arraysEqual,
  transformExperience,
  transformPhoneNumber,
} from "../../../../utilities";
import { candidateValidations } from "../../../../utilities/validation";
import styles from "./index.module.css";
import { DataContext } from "../../../../store/DataContextProvider";

const CandidateForm = ({ info, handleClose }) => {
  const { onUpdateSingleDataItem } = useContext(DataContext);
  const [localSkills, setLocalSkills] = useState(info.skills);

  const handleAddSkill = (newSkill) => {
    const lowerCaseSkill = newSkill.toLowerCase();

    if (!lowerCaseSkill || localSkills.includes(lowerCaseSkill)) {
      resetSkillValue();
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

  const {
    value: nameValue,
    handleInputChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    error: nameError,
  } = useInput(info.name, (value) =>
    candidateValidations.name(info.name, value)
  );

  const {
    value: phoneValue,
    handleInputChange: handlePhoneChange,
    handleInputBlur: handlePhoneBlur,
    error: phoneError,
  } = useInput(
    info.phone_numbers,
    (value) => candidateValidations.phone(info.phone_numbers, value),
    transformPhoneNumber
  );

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    error: emailError,
  } = useInput(info.email, (value) =>
    candidateValidations.email(info.email, value)
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
  } = useInput(info.linkedin, (value) =>
    candidateValidations.linkedIn(info.linkedin, value)
  );

  const {
    value: cityValue,
    handleInputChange: handleCityChange,
    handleInputBlur: handleCityBlur,
    error: cityError,
  } = useInput(info.location, (value) =>
    candidateValidations.city(info.location, value)
  );

  const {
    value: stateValue,
    handleInputChange: handleStateChange,
    handleInputBlur: handleStateBlur,
    error: stateError,
  } = useInput(info.region, (value) =>
    candidateValidations.state(info.region, value)
  );

  const {
    value: experienceValue,
    handleInputChange: handleExperienceChange,
    handleInputBlur: handleExperienceBlur,
    error: experienceError,
  } = useInput(
    info.total_experience,
    (value) => candidateValidations.experience(info.phone_numbers, value),
    transformExperience
  );

  // Utility function to check if form values are unchanged
  const hasFormChanged = () => {
    return (
      nameValue !== info.name ||
      phoneValue !== info.phone_numbers ||
      emailValue !== info.email ||
      linkedInValue !== info.linkedin ||
      cityValue !== info.location ||
      stateValue !== info.region ||
      experienceValue !== info.total_experience ||
      !arraysEqual(localSkills, info.skills)
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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!enableSave) return;

    const formData = {
      id: info.id,
      name: nameValue,
      phone_numbers: phoneValue,
      email: emailValue,
      location: cityValue,
      region: stateValue,
      linkedin: linkedInValue,
      skills: localSkills.join(","),
      total_experience: experienceValue,
      file_path: info.file_path || "",
    };

    // if api call suceeds
    formData.skills = localSkills;
    onUpdateSingleDataItem(formData);
  };

  return (
    <form>
      <hr />
      <div className={styles["candidate-form"]}>
        <div className={styles["section-1"]}>
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

        <div className={styles["section-2"]}>
          <Skills
            skills={localSkills}
            isEditable={true}
            onClick={handleRemoveSkill}
          />
        </div>
      </div>
      <div className={styles["section-3"]}>
        <p className={styles["http-error"]}>some error text</p>
        <Button
          title="Close"
          className={styles["close-button"]}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          title="Save"
          className={styles["save-button"]}
          onClick={handleFormSubmit}
          disabled={!enableSave}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

CandidateForm.displayName = "CandidateForm";
export default CandidateForm;
