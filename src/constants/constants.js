export const INSIGHT = {
  CANDIDATES_PER_PAGE: 20,
  MAX_FILES: 30,
  MAX_FILE_SIZE: 5, // in MB
  RESUME_VIEWER_WIDTH_START: 414,
};

export const ONBOARD = {
  CANDIDATES_PER_PAGE: 20,
};

export const LOADER_TYPES = {
  BAR: "bar",
  SPIN: "spin",
};

export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  INVALID: 400,
};

export const REGEX = {
  usernameRegex: /^[a-zA-Z-]{3,20}$/, // Only letters (upper or lower case) and hyphens, length between 3 and 20 characters
  phoneRegex: /^[\d\s()-]{10,}$/, // Only allows up to 10 digits
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // General email pattern: non-whitespace characters, followed by '@', a domain name, and a valid top-level domain
  passwordRegex: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, // Requires at least 8 characters, with at least one upper case, one lower case, one number, and one special character, no spaces allowed
  linkedInRegex: /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/, // Valid LinkedIn profile URL: must start with "https://www.linkedin.com/in/" followed by alphanumeric characters or hyphens
  passportNumberRegex: /^[A-Z][0-9]{7}$/, // Valid passport number: starts with one uppercase letter, followed by exactly 7 digits (for example: A1234567)
  eadNumberRegex: /^[A-Z]{3}[0-9]{10}$/, // EAD card number: starts with exactly 3 uppercase letters, followed by exactly 10 digits (e.g., ABC1234567890)
  ssnRegex: /^(?=(?:\D*\d){9}$)[\d\s-]+$/, // SSN: Allows exactly 9 digits with optional spaces and hyphens (e.g., 123-45-6789 or 123 45 6789)
  licenseNumberRegex: /^[A-Z0-9]{5,15}$/, // License number: allows 5 to 15 alphanumeric characters (uppercase letters and digits)
  stateIDNumberRegex: /^[A-Z0-9]{5,15}$/, // State ID number: similar to license number, allows 5 to 15 alphanumeric characters (uppercase letters and digits)
  skypeIDRegex: /^[a-zA-Z][a-zA-Z0-9_.,-:]{5,31}$/, // Skype ID: must start with a letter, followed by 5 to 31 characters that can include letters, digits, underscores, commas, periods, hyphens, and colons
  usZipCodeRegex: /^\d{5}(-\d{4})?$/, // US ZIP code: exactly 5 digits, optionally followed by a hyphen and exactly 4 more digits
  indiaZipCodeRegex: /^\d{6}$/, // Indian ZIP code: exactly 6 digits
  sevisIDRegex: /^N[0-9]{10}$/, // Starts with "N" followed by exactly 10 digits
};

export const LOADING_ACTION_TYPES = {
  APP: "APP",
  BUTTON: "BUTTON",
  FETCH: "FETCH",
};

export const STATUS_ACTION_TYPES = {
  UPDATE: "UPDATE_STATUS",
  RESET: "RESET_STATUS",
};

const UI_ACTION_TYPES = {
  UPDATE_SEARCH_TERM: "UPDATE_SEARCH_TERM",
  UPDATE_PAGINATION: "UPDATE_PAGINATION",
  UPDATE_REFETCH_URL: "UPDATE_REFETCH_URL",
  ENABLE_REFETCH: "ENABLE_REFETCH",
  DISABLE_REFETCH: "DISABLE_REFETCH",
  RESET_ALL: "RESET_ALL",
};
