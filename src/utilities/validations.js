import { CONTENT, REGEX } from "../constants";
import { getEighteenYearsAgoDate } from "./utilities";

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
    secondaryPhone: (value) => {
      const digitsOnly = value.replace(/[\s()-]+/g, "");
      return isEmpty(value)
        ? ""
        : validateWithRegex(
            digitsOnly,
            REGEX.phoneRegex,
            validationMsgs.phone.invalid
          );
    },
    dob: (value) => {
      if (isEmpty(value)) {
        return validationMsgs.dob.empty;
      }
      const invalidMsg = validateWithRegex(
        value,
        REGEX.dateRegex,
        validationMsgs.dob.invalid
      );

      if (invalidMsg) return invalidMsg;

      // Extract month, day, and year
      const [month, day, year] = value.split("/");

      // Skip age validation if any part is '00'
      if (month === "00" || day === "00" || year === "0000") {
        return ""; // Accept partial dates without age restriction
      }

      // Convert DOB to comparable format (YYYY-MM-DD)
      const formattedDOB = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;

      // Compare DOB with 18 years ago date
      if (formattedDOB > getEighteenYearsAgoDate()) {
        return validationMsgs.dob.tooYoung; // Custom error message for underage
      }

      return "";
    },
    gender: (value) => (isEmpty(value) ? validationMsgs.gender.empty : ""),
    passportNumber: (value, isOptional) =>
      isEmpty(value)
        ? isOptional
          ? ""
          : validationMsgs.passportNumber.empty
        : validateWithRegex(
            value,
            REGEX.passportNumberRegex,
            validationMsgs.passportNumber.invalid
          ),
    visaStatus: (value) =>
      isEmpty(value) ? validationMsgs.visaStatus.empty : "",
    eadNumber: (value, isOptional) =>
      isEmpty(value)
        ? isOptional
          ? ""
          : validationMsgs.eadNumber.empty
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
    zipcode: (value, country) => {
      if (isEmpty(value)) {
        return validationMsgs.zipcode.empty;
      }

      // Retrieve the appropriate regex for the specified country
      const regex = REGEX.zipCodeRegex[country] || REGEX.zipCodeRegex.others;

      // Skip validation if country has no specific regex (e.g., "Others")
      if (!regex) {
        return "";
      }

      // Validate using the determined regex pattern
      return validateWithRegex(value, regex, validationMsgs.zipcode.invalid);
    },
    address1: (value) => (isEmpty(value) ? validationMsgs.address1.empty : ""),
    city: (value) => (isEmpty(value) ? validationMsgs.city.empty : ""),
    state: (value) => (isEmpty(value) ? validationMsgs.state.empty : ""),
    country: (value) => (isEmpty(value) ? validationMsgs.country.empty : ""),
  },
  relocation: {
    howSoon: (value) => (isEmpty(value) ? validationMsgs.howSoon.empty : ""),
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
    year: (value) =>
      isEmpty(value) ? validationMsgs.passedMonthAndYear.empty : "",
    universityStream: (value) =>
      isEmpty(value) ? validationMsgs.stream.empty : "",
    certificate: (value) =>
      isEmpty(value) ? validationMsgs.certificate.empty : "",
  },
  profession: {
    experienceInYears: (value) =>
      isEmpty(value)
        ? validationMsgs.experienceInYears.empty
        : value < 0 || value > 100
        ? validationMsgs.experience.invalid
        : undefined,
    experienceInMonths: (value) =>
      isEmpty(value) ? validationMsgs.experienceInMonths.empty : "",
    technology: (value) =>
      isEmpty(value) ? validationMsgs.technology.empty : "",
    employerName: (value) =>
      isEmpty(value) ? validationMsgs.employerName.empty : "",
    employerEmail: (value) =>
      isEmpty(value)
        ? validationMsgs.employerEmail.empty
        : validateWithRegex(
            value,
            REGEX.emailRegex,
            validationMsgs.email.invalid
          ),
    employerPhone: (value) =>
      isEmpty(value)
        ? validationMsgs.employerPhone.empty
        : validateWithRegex(
            value,
            REGEX.phoneRegex,
            validationMsgs.phone.invalid
          ),
    referenceName: (value) =>
      isEmpty(value) ? validationMsgs.referenceName.empty : "",

    referencePhone: (value) =>
      isEmpty(value)
        ? validationMsgs.referencePhone.empty
        : validateWithRegex(
            value,
            REGEX.phoneRegex,
            validationMsgs.referencePhone.invalid
          ),

    referenceEmail: (value) =>
      isEmpty(value)
        ? validationMsgs.referenceEmail.empty
        : validateWithRegex(
            value,
            REGEX.emailRegex,
            validationMsgs.referenceEmail.invalid
          ),

    referenceDesignation: (value) =>
      isEmpty(value) ? validationMsgs.referenceDesignation.empty : "",

    referenceCompany: (value) =>
      isEmpty(value) ? validationMsgs.referenceCompany.empty : "",
    linkedInIdentifier: (value, isOptional) =>
      isEmpty(value)
        ? isOptional
          ? ""
          : validationMsgs.linkedInIdentifier.empty
        : validateWithRegex(
            value,
            REGEX.linkedInIdentifierRegex,
            validationMsgs.linkedInIdentifier.invalid
          ),
  },
  offerLetter: {
    status: (value) =>
      isEmpty(value) ? validationMsgs.offerLetterStatus.empty : "",
    marketingName: (value) =>
      isEmpty(value) ? validationMsgs.marketingName.empty : "",
    designation: (value) =>
      isEmpty(value) ? validationMsgs.offerLetterDesignation.empty : "",
    startDate: (value) =>
      isEmpty(value) ? validationMsgs.startDate.empty : "",
    endDate: (value) => (isEmpty(value) ? validationMsgs.endDate.empty : ""),
    rolesAndResponsibilities: (value) => {
      if (isEmpty(value)) {
        return validationMsgs.rolesAndResponsibilities.empty;
      }
      if (value.length < 50) {
        return validationMsgs.rolesAndResponsibilities.minLength;
      }
      if (value.length > 1000) {
        return validationMsgs.rolesAndResponsibilities.maxLength;
      }
      return ""; // No error
    },
  },
  usTravelAndStay: {
    usEntry: (value, isOptional) =>
      isOptional ? "" : isEmpty(value) ? validationMsgs.usEntry.empty : "",
  },
  emergencyContacts: {
    name: (value, isOptional) =>
      isOptional ? "" : isEmpty(value) ? validationMsgs.name.empty : "",
    phone: (value, isOptional) => {
      const digitsOnly = value.replace(/[\s()-]+/g, "");
      return isEmpty(value)
        ? isOptional
          ? ""
          : validationMsgs.phone.empty
        : validateWithRegex(
            digitsOnly,
            REGEX.phoneRegex,
            validationMsgs.phone.invalid
          );
    },
  },
};

export const sparkValidations = {
  jobDescription: (value) =>
    isEmpty(value) ? validationMsgs.jobDescription.empty : "",
  uploadResume: (value) =>
    value === undefined ? validationMsgs.uploadResume.empty : "",
  chooseService: (value) =>
    isEmpty(value) ? validationMsgs.chooseService.empty : "",
  actions: (value) => (isEmpty(value) ? validationMsgs.actions.empty : ""),
};

export const questValidations = {
  jobDescription: (value) =>
    isEmpty(value) ? validationMsgs.jobDescription.empty : "",
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
};

export const forgeValidations = {
  submission: {
    date: (value) => (isEmpty(value) ? validationMsgs.date.empty : ""),
    submitBy: (value) => (isEmpty(value) ? validationMsgs.name.empty : ""),
  },
  candidate: {
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
    city: (value) => (isEmpty(value) ? validationMsgs.city.empty : ""),
    state: (value) => (isEmpty(value) ? validationMsgs.state.empty : ""),
    visaStatus: (value) =>
      isEmpty(value) ? validationMsgs.visaStatus.empty : "",
    experienceInYears: (value) =>
      isEmpty(value)
        ? validationMsgs.experienceInYears.empty
        : value < 0 || value > 100
        ? validationMsgs.experience.invalid
        : undefined,
    experienceInMonths: (value) =>
      isEmpty(value) ? validationMsgs.experienceInMonths.empty : "",
  },
  requirement: {
    clientName: (value) =>
      isEmpty(value) ? validationMsgs.clientName.empty : "",
    position: (value) => (isEmpty(value) ? validationMsgs.position.empty : ""),
    rateFrequency: (value) =>
      isEmpty(value) ? validationMsgs.rateFrequency.empty : "",
    rate: (value) => {
      const numericValue = Number(value);
      return isEmpty(value)
        ? validationMsgs.rate.empty
        : isNaN(numericValue) || numericValue < 0
        ? validationMsgs.rate.invalid
        : undefined;
    },
    terms: (value) => (isEmpty(value) ? validationMsgs.terms.empty : ""),
    city: (value) => (isEmpty(value) ? validationMsgs.city.empty : ""),
    state: (value) => (isEmpty(value) ? validationMsgs.state.empty : ""),
    primeVendor: (value) =>
      isEmpty(value) ? validationMsgs.primeVendor.empty : "",
    implementor: (value) =>
      isEmpty(value) ? validationMsgs.projectImplementor.empty : "",
  },
  vendorOrEmployer: {
    name: (value) => (isEmpty(value) ? validationMsgs.name.empty : ""),
    companyName: (value) =>
      isEmpty(value) ? validationMsgs.companyName.empty : "",
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
    phone: (value, isOptional) => {
      const digitsOnly = value.replace(/[\s()-]+/g, "");
      return isEmpty(value)
        ? isOptional
          ? ""
          : validationMsgs.phone.empty
        : validateWithRegex(
            digitsOnly,
            REGEX.phoneRegex,
            validationMsgs.phone.invalid
          );
    },
    extension: (value, isOptional) => {
      return isEmpty(value)
        ? isOptional
          ? ""
          : validationMsgs.extension.empty
        : validateWithRegex(
            value,
            REGEX.extensionRegex,
            validationMsgs.extension.invalid
          );
    },
  },
};

export const nexusValidations = {
  URL: (value) => {
    return isEmpty(value) ? validationMsgs.url.empty : undefined || ""; // validateWithRegex(value, REGEX.urlRegex, validationMsgs.url.invalid); // temporarily remove url regex validation
  },
};
