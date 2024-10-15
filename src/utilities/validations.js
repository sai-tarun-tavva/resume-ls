import { CONTENT, REGEX } from "../constants";

const validationMsgs = CONTENT.COMMON.errors;

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
    validateEmpty(enteredValue, value, validationMsgs.name.empty),

  phone: (value, enteredValue) => {
    const digitsOnly = enteredValue.replace(/[\s()-]+/g, "");
    return (
      validateEmpty(enteredValue, value, validationMsgs.phone.empty) ||
      validateWithRegex(
        digitsOnly,
        REGEX.phoneRegex,
        validationMsgs.phone.invalid
      )
    );
  },

  email: (value, enteredValue) =>
    validateEmpty(enteredValue, value, validationMsgs.email.empty) ||
    validateWithRegex(
      enteredValue,
      REGEX.emailRegex,
      validationMsgs.email.invalid
    ),

  linkedIn: (value, enteredValue) =>
    validateEmpty(enteredValue, value, validationMsgs.linkedInUrl.empty) ||
    validateWithRegex(
      enteredValue,
      REGEX.linkedInRegex,
      validationMsgs.linkedInUrl.invalid
    ),

  city: (value, enteredValue) =>
    validateEmpty(enteredValue, value, validationMsgs.city.empty),

  state: (value, enteredValue) =>
    validateEmpty(enteredValue, value, validationMsgs.state.empty),

  experience: (value, enteredValue) => {
    const experienceNumber = Number(enteredValue);
    return (
      validateEmpty(enteredValue, value, validationMsgs.experience.empty) ||
      (enteredValue &&
        (experienceNumber < 0 || experienceNumber > 100
          ? validationMsgs.experience.invalid
          : undefined))
    );
  },
};

export const authValidations = {
  userName: (value) => {
    return isEmpty(value)
      ? validationMsgs.username.empty
      : undefined ||
          (value.length < 3 ||
          value.length > 20 ||
          !REGEX.usernameRegex.test(value)
            ? validationMsgs.username.invalid
            : undefined);
  },

  password: (value) => {
    return isEmpty(value)
      ? validationMsgs.password.empty
      : undefined ||
          validateWithRegex(
            value,
            REGEX.passwordRegex,
            validationMsgs.password.invalid
          );
  },

  email: (value) => {
    return isEmpty(value)
      ? validationMsgs.email.empty
      : undefined ||
          validateWithRegex(
            value,
            REGEX.emailRegex,
            validationMsgs.email.invalid
          );
  },
};
