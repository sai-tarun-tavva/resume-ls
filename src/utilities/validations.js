import { CONTENT, REGEX } from "../constants";

const candidateValidationMsgs = CONTENT.candidateHub.candidateForm.errors;
const authValidationMsgs = CONTENT.authPage.authPanel.errors;

// Helper function for empty value checks
const isEmpty = (value) => value === "";

// Helper function for regex checks
const validateWithRegex = (value, regex, errorMsg) => {
  if (value && !regex.test(value)) return errorMsg;
};

// Helper function to handle empty value validation
const validateEmpty = (enteredValue, value, errorMsg) => {
  return isEmpty(enteredValue) && value ? errorMsg : undefined;
};

export const candidateValidations = {
  name: (value, enteredValue) =>
    validateEmpty(enteredValue, value, candidateValidationMsgs.name.empty),

  phone: (value, enteredValue) => {
    const digitsOnly = enteredValue.replace(/\s+/g, "");
    return (
      validateEmpty(enteredValue, value, candidateValidationMsgs.phone.empty) ||
      validateWithRegex(
        digitsOnly,
        REGEX.phoneRegex,
        candidateValidationMsgs.phone.invalid
      )
    );
  },

  email: (value, enteredValue) =>
    validateEmpty(enteredValue, value, candidateValidationMsgs.email.empty) ||
    validateWithRegex(
      enteredValue,
      REGEX.emailRegex,
      candidateValidationMsgs.email.invalid
    ),

  linkedIn: (value, enteredValue) =>
    validateEmpty(
      enteredValue,
      value,
      candidateValidationMsgs.linkedInUrl.empty
    ) ||
    validateWithRegex(
      enteredValue,
      REGEX.linkedInRegex,
      candidateValidationMsgs.linkedInUrl.invalid
    ),

  city: (value, enteredValue) =>
    validateEmpty(enteredValue, value, candidateValidationMsgs.city.empty),

  state: (value, enteredValue) =>
    validateEmpty(enteredValue, value, candidateValidationMsgs.state.empty),

  experience: (value, enteredValue) => {
    const experienceNumber = Number(enteredValue);
    return (
      validateEmpty(
        enteredValue,
        value,
        candidateValidationMsgs.experience.empty
      ) ||
      (enteredValue &&
        (experienceNumber < 0 || experienceNumber > 100
          ? candidateValidationMsgs.experience.invalid
          : undefined))
    );
  },
};

export const authValidations = {
  userName: (value) => {
    return isEmpty(value)
      ? authValidationMsgs.username.empty
      : undefined ||
          (value.length < 3 ||
          value.length > 20 ||
          !REGEX.usernameRegex.test(value)
            ? authValidationMsgs.username.invalid
            : undefined);
  },

  password: (value) => {
    return isEmpty(value)
      ? authValidationMsgs.password.empty
      : undefined ||
          validateWithRegex(
            value,
            REGEX.passwordRegex,
            authValidationMsgs.password.invalid
          );
  },

  email: (value) => {
    return isEmpty(value)
      ? authValidationMsgs.email.empty
      : undefined ||
          validateWithRegex(
            value,
            REGEX.emailRegex,
            authValidationMsgs.email.invalid
          );
  },
};
