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
          validateWithRegex(
            value,
            REGEX.usernameRegex,
            validationMsgs.username.invalid
          );
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

export const onboardingValidations = {
  onboarding: {
    date: (value) => (isEmpty(value) ? validationMsgs.date.empty : ""),
    status: (value) => (isEmpty(value) ? validationMsgs.status.empty : ""),
  },
  personal: {
    firstName: (value) =>
      isEmpty(value) ? validationMsgs.firstName.empty : "",
    lastName: (value) => (isEmpty(value) ? validationMsgs.lastName.empty : ""),
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
    phone: (value) => {
      const digitsOnly = value.replace(/[\s()-]+/g, "");
      return isEmpty(value)
        ? validationMsgs.phone.empty
        : validateWithRegex(
            digitsOnly,
            REGEX.phoneRegex,
            validationMsgs.phone.invalid
          );
    },
    dob: (value) => (isEmpty(value) ? validationMsgs.dob.empty : ""),
    gender: (value) => (isEmpty(value) ? validationMsgs.gender.empty : ""),
    passportNumber: (value) =>
      isEmpty(value)
        ? validationMsgs.passportNumber.empty
        : validateWithRegex(
            value,
            REGEX.passportNumberRegex,
            validationMsgs.passportNumber.invalid
          ),
    visaStatus: (value) =>
      isEmpty(value) ? validationMsgs.visaStatus.empty : "",
    eadNumber: (value) =>
      isEmpty(value)
        ? validationMsgs.eadNumber.empty
        : validateWithRegex(
            value,
            REGEX.eadNumberRegex,
            validationMsgs.eadNumber.invalid
          ),
    SSN: (value) =>
      isEmpty(value)
        ? validationMsgs.ssn.empty
        : validateWithRegex(value, REGEX.ssnRegex, validationMsgs.ssn.invalid),
    licenseNumber: (value) =>
      isEmpty(value)
        ? validationMsgs.licenseNumber.empty
        : validateWithRegex(
            value,
            REGEX.licenseNumberRegex,
            validationMsgs.licenseNumber.invalid
          ),
    stateIDNumber: (value) =>
      isEmpty(value)
        ? validationMsgs.stateIDNumber.empty
        : validateWithRegex(
            value,
            REGEX.stateIDNumberRegex,
            validationMsgs.stateIDNumber.invalid
          ),
    skypeId: (value) =>
      isEmpty(value)
        ? ""
        : validateWithRegex(
            value,
            REGEX.skypeIDRegex,
            validationMsgs.skypeIDNumber.invalid
          ),
  },
  address: {
    zipcode: (value) =>
      isEmpty(value)
        ? validationMsgs.zipcode.empty
        : validateWithRegex(
            value,
            REGEX.zipCodeRegex,
            validationMsgs.zipcode.invalid
          ),
    address1: (value) => (isEmpty(value) ? validationMsgs.address1.empty : ""),
    city: (value) => (isEmpty(value) ? validationMsgs.city.empty : ""),
    state: (value) => (isEmpty(value) ? validationMsgs.state.empty : ""),
    country: (value) => (isEmpty(value) ? validationMsgs.country.empty : ""),
  },
  relocation: {
    stayPreference: (value) =>
      isEmpty(value) ? validationMsgs.stayPreference.empty : "",
  },
  education: {
    sevisID: (value) =>
      isEmpty(value)
        ? validationMsgs.sevisID.empty
        : validateWithRegex(
            value,
            REGEX.sevisIDRegex,
            validationMsgs.sevisID.invalid
          ),
    dsoName: (value) => (isEmpty(value) ? validationMsgs.dsoName.empty : ""),
    dsoEmail: (value) =>
      isEmpty(value)
        ? validationMsgs.email.empty
        : validateWithRegex(
            value,
            REGEX.emailRegex,
            validationMsgs.email.invalid
          ),
    dsoPhone: (value) => {
      const digitsOnly = value.replace(/[\s()-]+/g, "");
      return isEmpty(value)
        ? validationMsgs.phone.empty
        : validateWithRegex(
            digitsOnly,
            REGEX.phoneRegex,
            validationMsgs.phone.invalid
          );
    },
    universityName: (value) =>
      isEmpty(value) ? validationMsgs.universityName.empty : "",
    year: (value) => (isEmpty(value) ? validationMsgs.passedYear.empty : ""),
    universityStream: (value) =>
      isEmpty(value) ? validationMsgs.stream.empty : "",
  },
};
