import { content, REGEX } from "../constants";

const candidateValidationMsgs = content.candidateHub.candidateForm.errors;
const authValidationMsgs = content.authPage.authPanel.errors;

// Helper function for empty value checks
const isEmpty = (value) => value === "";

// Helper function for regex checks
const validateWithRegex = (value, regex, errorMsg) => {
  if (!regex.test(value)) return errorMsg;
};

export const candidateValidations = {
  name: (value, enteredValue) =>
    isEmpty(enteredValue) && value
      ? candidateValidationMsgs.name.empty
      : undefined,
  phone: (value, enteredValue) => {
    const digitsOnly = enteredValue.replace(/\s+/g, "");
    return isEmpty(enteredValue) && value
      ? candidateValidationMsgs.phone.empty
      : validateWithRegex(
          digitsOnly,
          REGEX.phoneRegex,
          candidateValidationMsgs.phone.invalid
        );
  },
  email: (value, enteredValue) =>
    isEmpty(enteredValue) && value
      ? candidateValidationMsgs.email.empty
      : validateWithRegex(
          enteredValue,
          REGEX.emailRegex,
          candidateValidationMsgs.email.invalid
        ),
  linkedIn: (value, enteredValue) =>
    isEmpty(enteredValue) && value
      ? candidateValidationMsgs.linkedInUrl.empty
      : validateWithRegex(
          enteredValue,
          REGEX.linkedInRegex,
          candidateValidationMsgs.linkedInUrl.invalid
        ),
  city: (value, enteredValue) =>
    isEmpty(enteredValue) && value
      ? candidateValidationMsgs.city.empty
      : undefined,
  state: (value, enteredValue) =>
    isEmpty(enteredValue) && value
      ? candidateValidationMsgs.state.empty
      : undefined,
  experience: (value, enteredValue) => {
    const experienceNumber = Number(enteredValue);
    return isEmpty(enteredValue) && value
      ? candidateValidationMsgs.experience.empty
      : experienceNumber < 0 || experienceNumber > 100
      ? candidateValidationMsgs.experience.invalid
      : undefined;
  },
};

export const authValidations = {
  userName: (value) => {
    return isEmpty(value)
      ? authValidationMsgs.username.empty
      : value.length < 3 ||
        value.length > 20 ||
        !REGEX.usernameRegex.test(value)
      ? authValidationMsgs.username.invalid
      : undefined;
  },
  password: (value) => {
    return isEmpty(value)
      ? authValidationMsgs.password.empty
      : validateWithRegex(
          value,
          REGEX.passwordRegex,
          authValidationMsgs.password.invalid
        );
  },
  email: (value) => {
    return isEmpty(value)
      ? authValidationMsgs.email.empty
      : validateWithRegex(
          value,
          REGEX.emailRegex,
          authValidationMsgs.email.invalid
        );
  },
};
