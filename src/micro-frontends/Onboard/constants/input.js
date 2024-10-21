export const FIELDS_ADDRESS = {
  ADDRESS1: "address1",
  ADDRESS2: "address2",
  CITY: "city",
  STATE: "state",
  COUNTRY: "country",
  ZIPCODE: "zipcode",
};

export const FIELDS_PREV_EXP = {
  EMPLOYER_NAME: "employerName",
  ADDRESS: "address",
  EMAIL: "email",
  PHONE: "phone",
};

export const FIELDS_REFERENCE = {
  NAME: "name",
  PHONE: "phone",
  MAIL: "mail",
  DESIGNATION: "designation",
  COMPANY: "company",
};

export const SECTION_TITLES = [
  "Onboarding",
  "Personal",
  "Current Location",
  "Relocation",
  "Education",
  "Profession",
  "Offer Letter",
  "US Travel and Stay",
  "Emergency Contacts",
  "Additional Information",
];

export const SECTIONS = {
  RECORD: "record",
  ONBOARDING: "onboarding",
  PERSONAL: "personal",
  RELOCATION: "relocation",
  EDUCATION: "education",
  PROFESSION: "profession",
  OFFER_LETTER: "offerLetter",
  US_TRAVEL_AND_STAY: "usTravelAndStay",
  EMERGENCY_CONTACTS: "emergencyContacts",
  ADDITIONAL: "additional",
};

export const FIELDS = {
  RECORD: {
    ID: "id",
    CREATED_DATE: "createdDate",
    UPDATED_DATE: "updatedDate",
  },
  ONBOARDING: {
    DATE: "date",
    STATUS: "status",
  },
  PERSONAL: {
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    EMAIL_ID: "emailId",
    PHONE_NUMBER: "phoneNumber",
    GENDER: "gender",
    CURRENT_LOCATION: "currentLocation",
    DOB: "dob",
    MARITAL_STATUS: "maritalStatus",
    PASSPORT_NUMBER: "passportNumber",
    VISA_STATUS: "visaStatus",
    PHOTO_ID: {
      VALUE: "photoID",
      TYPE: "type",
      NUMBER: "number",
    },
    EAD_NUMBER: "eadNumber",
    SSN: "SSN",
    SKYPE_ID: "skypeId",
    REFERENCE_NAME: "referenceName",
  },
  RELOCATION: {
    INTERESTED: {
      VALUE: "interested",
      OPTIONS: {
        YES: "Yes",
        NO: "No",
      },
    },
    PREFERENCE: "preference",
    ADDRESS: "address",
  },
  EDUCATION: {
    SEVIS_ID: "sevisID",
    DSO: {
      VALUE: "dso",
      NAME: "name",
      EMAIL: "email",
      PHONE: "phone",
    },
    GRADUATED_UNIVERSITY: {
      VALUE: "graduatedUniversity",
      NAME: "name",
      ADDRESS: "address",
      PASSED_MONTH_YEAR: "passedMonthAndYear",
      STREAM: "stream",
      ADDITIONAL_CERTIFICATIONS: "additionalCertifications",
    },
  },
  PROFESSION: {
    TRAINING_ATTENDED: {
      VALUE: "trainingAttended",
      OPTIONS: {
        YES: "Yes",
        NO: "No",
      },
    },
    EXPERIENCE: {
      VALUE: "experience",
      YEARS: "years",
      MONTHS: "months",
    },
    TECHNOLOGIES_KNOWN: "technologiesKnown",
    PREVIOUS_EXPERIENCE: "previousExperience",
    REFERENCES: "references",
  },
  OFFER_LETTER: {
    STATUS: "status",
    MARKETING_NAME: "marketingName",
    LAST_UPDATED: "lastUpdated",
    DESIGNATION: "designation",
    START_DATE: "startDate",
    END_DATE: "endDate",
    ROLES_AND_RESPONSIBILITIES: "rolesAndResponsibilities",
  },
  US_TRAVEL_AND_STAY: {
    US_ENTRY: "usEntry",
    STAY_ADDRESSES: "stayAddresses",
  },
  EMERGENCY_CONTACTS: {
    USA: {
      VALUE: "usa",
      NAME: "name",
      PHONE: "phone",
    },
    HOME_COUNTRY: {
      VALUE: "homeCountry",
      NAME: "name",
      PHONE: "phone",
    },
  },
  ADDITIONAL: {
    REMARKS: "remarks",
    NOTES: "notes",
  },
};
