/**
 * Fields for address information in the form.
 * These keys represent different parts of the address section, such as address lines, city, state, and zipcode.
 */
export const FIELDS_ADDRESS = {
  ADDRESS1: "address1", // Key for the primary address line 1
  ADDRESS2: "address2", // Key for the secondary address line 2 (optional)
  CITY: "city", // Key for the city field
  STATE: "state", // Key for the state field
  COUNTRY: "country", // Key for the country field
  ZIPCODE: "zipcode", // Key for the zipcode field
};

/**
 * Fields related to the previous employment experience section of the form.
 * These fields represent employer name, address, email, and phone number.
 */
export const FIELDS_PREV_EXP = {
  EMPLOYER_NAME: "employerName", // Key for the previous employer name field
  ADDRESS: "address", // Key for the address of the previous employer
  EMAIL: "email", // Key for the email of the previous employer
  PHONE: "phone", // Key for the phone number of the previous employer
};

/**
 * Fields related to references provided by the candidate.
 * These fields represent reference name, phone number, email, designation, and company.
 */
export const FIELDS_REFERENCE = {
  NAME: "name", // Key for the reference's name
  PHONE: "phone", // Key for the reference's phone number
  EMAIL: "email", // Key for the reference's email
  DESIGNATION: "designation", // Key for the reference's designation
  COMPANY: "company", // Key for the reference's company
};

/**
 * Titles for the sections in the onboarding form.
 * These titles are used to organize the sections in the form.
 */
export const SECTION_TITLES = [
  "Onboarding", // Title for the onboarding section
  "Personal", // Title for the personal details section
  "Location", // Title for the location details section
  "Relocation", // Title for the relocation section
  "Education", // Title for the education details section
  "Profession", // Title for the professional experience section
  "Offer Letter", // Title for the offer letter section
  "US Travel and Stay", // Title for the US travel and stay section
  "Emergency Contacts", // Title for the emergency contacts section
  "Miscellaneous", // Title for the miscellaneous information section
];

/**
 * Sections of the form with keys representing different sections.
 * These are used to map to the actual form data and manage the state.
 */
export const SECTIONS = {
  RECORD: "record", // Key for the record section
  ONBOARDING: "onboarding", // Key for the onboarding section
  PERSONAL: "personal", // Key for the personal section
  LOCATION: "location", // Key for the location section
  RELOCATION: "relocation", // Key for the relocation section
  EDUCATION: "education", // Key for the education section
  PROFESSION: "profession", // Key for the profession section
  OFFER_LETTER: "offerLetter", // Key for the offer letter section
  US_TRAVEL_AND_STAY: "usTravelAndStay", // Key for the US travel and stay section
  EMERGENCY_CONTACTS: "emergencyContacts", // Key for the emergency contacts section
  MISCELLANEOUS: "miscellaneous", // Key for the miscellaneous section
};

/**
 * Fields for various sections of the form, including personal, education, profession, and others.
 * Each section has fields that correspond to different data points in the form.
 */
export const FIELDS = {
  COMMON: {
    COMPLETED: "completed", // Key for the completion flag of each section
  },
  RECORD: {
    ID: "id", // Key for the record ID
    CREATED_DATE: "createdDate", // Key for the creation date of the record
    UPDATED_DATE: "updatedDate", // Key for the last updated date of the record
  },
  ONBOARDING: {
    DATE: "date", // Key for the onboarding date
    STATUS: "status", // Key for the onboarding status
  },
  PERSONAL: {
    FIRST_NAME: "firstName", // Key for the first name of the candidate
    LAST_NAME: "lastName", // Key for the last name of the candidate
    EMAIL_ID: "emailId", // Key for the candidate's email ID
    PHONE_NUMBER: "phoneNumber", // Key for the candidate's phone number
    SECONDARY_PHONE_NUMBER: "secondaryPhoneNumber", // Key for the secondary phone number
    GENDER: "gender", // Key for the gender of the candidate
    DOB: "dob", // Key for the date of birth of the candidate
    MARITAL_STATUS: "maritalStatus", // Key for the marital status of the candidate
    PASSPORT_NUMBER: "passportNumber", // Key for the passport number
    VISA_STATUS: "visaStatus", // Key for the visa status of the candidate
    PHOTO_ID: {
      VALUE: "photoID", // Key for the photo ID value
      TYPE: "type", // Key for the type of photo ID
      NUMBER: "number", // Key for the photo ID number
    },
    EAD_NUMBER: "eadNumber", // Key for the EAD number
    SSN: "SSN", // Key for the social security number (SSN)
    SKYPE_ID: "skypeId", // Key for the Skype ID
    REFERENCE_NAME: "referenceName", // Key for the reference name
  },
  LOCATION: {
    USA_LOCATION: "usaLocation", // Key for the candidate's location in the USA
    INDIA_LOCATION: "indiaLocation", // Key for the candidate's location in India
  },
  RELOCATION: {
    INTERESTED: {
      VALUE: "interested", // Key for whether the candidate is interested in relocation
      OPTIONS: {
        YES: "Yes", // Option for Yes
        NO: "No", // Option for No
      },
    },
    HOW_SOON: "howSoon", // Key for how soon the candidate is available to relocate
    PREFERENCE: "preference", // Key for the relocation preference (e.g., location)
    ADDRESS: "address", // Key for the relocation address
  },
  EDUCATION: {
    SEVIS_ID: "sevisID", // Key for the SEVIS ID
    DSO: {
      VALUE: "dso", // Key for the DSO (Designated School Official)
      NAME: "name", // Key for the DSO's name
      EMAIL: "email", // Key for the DSO's email
      PHONE: "phone", // Key for the DSO's phone number
    },
    GRADUATED_UNIVERSITY: {
      VALUE: "graduatedUniversity", // Key for the graduated university
      NAME: "name", // Key for the university's name
      ADDRESS: "address", // Key for the university's address
      PASSED_MONTH_YEAR: "passedMonthAndYear", // Key for the month and year the candidate graduated
      STREAM: "stream", // Key for the academic stream
      ADDITIONAL_CERTIFICATIONS: "additionalCertifications", // Key for any additional certifications
    },
  },
  PROFESSION: {
    TRAINING_ATTENDED: {
      VALUE: "trainingAttended", // Key for whether the candidate attended training
      OPTIONS: {
        YES: "Yes", // Option for Yes
        NO: "No", // Option for No
      },
    },
    EXPERIENCE: {
      VALUE: "experience", // Key for the professional experience
      YEARS: "years", // Key for years of experience
      MONTHS: "months", // Key for months of experience
    },
    TECHNOLOGIES_KNOWN: "technologiesKnown", // Key for the technologies known by the candidate
    PREVIOUS_EXPERIENCE: "previousExperience", // Key for the candidate's previous work experience
    REFERENCES: "references", // Key for the candidate's professional references
  },
  OFFER_LETTER: {
    STATUS: "status", // Key for the offer letter status
    MARKETING_NAME: "marketingName", // Key for the marketing name on the offer letter
    LAST_UPDATED: "lastUpdated", // Key for the last updated date of the offer letter
    DESIGNATION: "designation", // Key for the designation in the offer letter
    START_DATE: "startDate", // Key for the offer letter start date
    END_DATE: "endDate", // Key for the offer letter end date
    ROLES_AND_RESPONSIBILITIES: "rolesAndResponsibilities", // Key for roles and responsibilities listed in the offer letter
  },
  US_TRAVEL_AND_STAY: {
    US_ENTRY: "usEntry", // Key for US entry status
    STAY_ADDRESSES: "stayAddresses", // Key for stay addresses in the US
  },
  EMERGENCY_CONTACTS: {
    USA: {
      VALUE: "usa", // Key for the USA emergency contact
      NAME: "name", // Key for the name of the USA emergency contact
      PHONE: "phone", // Key for the phone number of the USA emergency contact
    },
    HOME_COUNTRY: {
      VALUE: "homeCountry", // Key for the home country emergency contact
      NAME: "name", // Key for the name of the home country emergency contact
      PHONE: "phone", // Key for the phone number of the home country emergency contact
    },
  },
  MISCELLANEOUS: {
    REMARKS: "remarks", // Key for remarks about the candidate
    NOTES: "notes", // Key for additional notes about the candidate
  },
};
