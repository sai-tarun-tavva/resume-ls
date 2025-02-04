/**
 * Titles for the sections in the forge form.
 * These titles are used to organize the sections in the form.
 */
export const SECTION_TITLES = {
  SALES: [
    "Submission", // Title for the submission section
    "Candidate", // Title for the candidate section
    "Requirement", // Title for the requirement section
    "Vendor", // Title for the vendor section
    "Miscellaneous", // Title for the miscellaneous section
  ],
  RECRUIT: [
    "Submission", // Title for the submission section
    "Candidate", // Title for the candidate section
    "Requirement", // Title for the requirement section
    "Sales Person", // Title for the employer section
    "Miscellaneous", // Title for the miscellaneous section
  ],
};

/**
 * Sections of the form with keys representing different sections.
 * These are used to map to the actual form data and manage the state.
 */
export const SECTIONS = {
  SALES: {
    RECORD: "record", // Key for the record section
    SUBMISSION: "submission", // Key for the submission section
    CANDIDATE: "candidate", // Key for the candidate section
    REQUIREMENT: "requirement", // Key for the requirement section
    VENDOR: "vendor", // Key for the vendor section
    MISCELLANEOUS: "miscellaneous", // Key for the miscellaneous section
  },
  RECRUIT: {
    RECORD: "record", // Key for the record section
    SUBMISSION: "submission", // Key for the submission section
    CANDIDATE: "candidate", // Key for the candidate section
    REQUIREMENT: "requirement", // Key for the requirement section
    EMPLOYER: "employer", // Key for the employer section
    MISCELLANEOUS: "miscellaneous", // Key for the miscellaneous section
  },
};

/**
 * Fields for various sections of the form, including submission, candidate, requirement, and others.
 * Each section has fields that correspond to different data points in the form.
 */
export const FIELDS = {
  SALES: {
    COMMON: {
      COMPLETED: "completed", // Key for the completion flag of each section
    },
    RECORD: {
      ID: "id", // Key for the record ID
      CREATED_DATE: "createdDate", // Key for the creation date of the record
      UPDATED_DATE: "updatedDate", // Key for the last updated date of the record
    },
    SUBMISSION: {
      DATE: "date", // Key for the submission date
      STATUS: "status", // Key for the submission status
      BY: "by", // Key for the sales person name
    },
    CANDIDATE: {
      FIRST_NAME: "firstName", // Key for the first name of the candidate
      LAST_NAME: "lastName", // Key for the last name of the candidate
    },
    REQUIREMENT: {
      CLIENT_NAME: "clientName", // Key for the client's name
      POSITION: "position", // Key for the position
      RATE: {
        LABEL: "rate", // Key for the rate
        FREQUENCY: "frequency", // Key for the rate frequency
        VALUE: "value", // Key for the rate value
      },
      TERMS: "terms", // Key for the job terms
      CITY: "city", // Key for the job city
      STATE: "state", // Key for the job state
      PRIME_VENDOR: "primeVendor", // Key for the prime vendor
      IMPLEMENTOR: "implementor", // Key for the project implementor
    },
    VENDOR: {
      NAME: "name", // Key for the vendor's name
      COMPANY: "company", // Key for the vendor's company
      PHONE: "phone", // Key for the vendor's phone
      ALTERNATE_PHONE: "alternatePhone", // Key for the vendor's alternate phone
      EXTENSION: "extension", // Key for the vendor's extension
      EMAIL: "email", // Key for the vendor's email
    },
    MISCELLANEOUS: {
      REMARKS: "remarks", // Key for remarks about the candidate
    },
  },
  RECRUIT: {
    COMMON: {
      COMPLETED: "completed", // Key for the completion flag of each section
    },
    RECORD: {
      ID: "id", // Key for the record ID
      CREATED_DATE: "createdDate", // Key for the creation date of the record
      UPDATED_DATE: "updatedDate", // Key for the last updated date of the record
    },
    SUBMISSION: {
      DATE: "date", // Key for the onboarding date
      STATUS: "status", // Key for the onboarding status
      BY: "by", // Key for the Recruiter name
    },
    CANDIDATE: {
      FIRST_NAME: "firstName", // Key for the first name of the candidate
      LAST_NAME: "lastName", // Key for the last name of the candidate
      EMAIL_ID: "emailId", // Key for the candidate's email ID
      PHONE_NUMBER: "phoneNumber", // Key for the candidate's phone number
      CITY: "city", // Key for the candidate's city field
      STATE: "state", // Key for the  candidate's state field
      VISA_STATUS: "visaStatus", // Key for the visa status of the candidate
      EXPERIENCE: {
        VALUE: "experience", // Key for the professional experience
        YEARS: "years", // Key for years of experience
        MONTHS: "months", // Key for months of experience
      },
    },
    REQUIREMENT: {
      CLIENT_NAME: "clientName", // Key for the client's name
      POSITION: "position", // Key for the position
      RATE: {
        LABEL: "rate", // Key for the rate
        FREQUENCY: "frequency", // Key for the rate frequency
        VALUE: "value", // Key for the rate value
      },
      TERMS: "terms", // Key for the job terms
    },
    EMPLOYER: {
      NAME: "name", // Key for the employer's name
      COMPANY: "company", // Key for the employer's company
      PHONE: "phone", // Key for the employer's phone
      ALTERNATE_PHONE: "alternatePhone", // Key for the employer's alternate phone
      EXTENSION: "extension", // Key for the employer's extension
      EMAIL: "email", // Key for the employer's email
    },
    MISCELLANEOUS: {
      REMARKS: "remarks", // Key for remarks about the candidate
    },
  },
};
