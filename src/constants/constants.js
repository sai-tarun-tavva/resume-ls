export const LOGISOFT_URL = "https://www.logisofttechinc.com/";

/**
 * Page Constants
 *
 * Defines main application page identifiers.
 */
export const PAGES = {
  INSIGHT: "insight",
  ONBOARD: "onboard",
  SPARK: "spark",
  QUEST: "quest",
  FORGE: "forge",
  NEXUS: "nexus",
};

/**
 * INSIGHT Configuration
 *
 * Manages settings specific to the INSIGHT module.
 *
 * @property {number} CANDIDATES_PER_PAGE - Number of candidates displayed per page.
 * @property {number} MAX_FILES - Maximum file upload limit.
 * @property {number} MAX_FILE_SIZE - Maximum file size in megabytes.
 * @property {number} RESUME_VIEWER_WIDTH_START - Minimum width to show resume viewer.
 */
export const INSIGHT = {
  CANDIDATES_PER_PAGE: 20,
  MAX_FILES: 30,
  MAX_FILE_SIZE: 5, // in MB
  RESUME_VIEWER_WIDTH_START: 480,
  TOGGLE_FIELD: "TOGGLE_FIELD",
  HIDE_FIELD: "HIDE_FIELD",
};

/**
 * ONBOARD Configuration
 *
 * Manages settings specific to the ONBOARD module.
 *
 * @property {number} CANDIDATES_PER_PAGE - Number of candidates displayed per page.
 */
export const ONBOARD = {
  CANDIDATES_PER_PAGE: 30,
};

/**
 * SPARK Configuration
 *
 * Manages settings specific to the SPARK module.
 *
 * @property {number} SUGGESTED_CHANGES - Number of changes suggested to improve resumes.
 */
export const SPARK = {
  SUGGESTED_CHANGES: 519, // Dummy count for visual appearance on purpose
};

/**
 * QUEST Configuration
 *
 * Manages settings specific to the QUEST module.
 *
 * @property {number} CALL_STATUES - Different status values for the call.
 */
export const QUEST = {
  CALL_STATUSES: {
    CALLING: "calling",
    COMPLETED: "completed",
    CANCELED: "canceled",
    FAILED: "failed",
    BUSY: "busy",
    NO_ANSWER: "no-answer",
  },
};

/**
 * FORGE Configuration
 *
 * Manages settings specific to the FORGE module.
 *
 * @property {number} CANDIDATES_PER_PAGE - Number of records displayed per page.
 */
export const FORGE = {
  CANDIDATES_PER_PAGE: 40,
};

/**
 * Loader Types
 *
 * Defines loading spinner or bar types.
 *
 * @property {string} BAR - Loading bar style.
 * @property {string} SPIN - Loading spinner style.
 */
export const LOADER_TYPES = {
  BAR: "bar",
  SPIN: "spin",
};

/**
 * Input Types
 *
 * Defines types of inputs used in forms.
 *
 * @property {string} CHECKBOX - Checkbox input type.
 * @property {string} FILE - File input type.
 * @property {string} SSN - SSN custom input.
 */
export const INPUT_TYPES = {
  CHECKBOX: "checkbox",
  FILE: "file",
  SSN: "ssn",
};

/**
 * HTTP Status Codes
 *
 * Contains frequently used HTTP status codes for API responses.
 *
 * @property {number} SUCCESS - Status code for successful requests.
 * @property {number} CREATED - Status code for successfully created resources.
 * @property {number} INVALID - Status code for invalid request data.
 */
export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  INVALID: 400,
};

export const REGEX = {
  usernameRegex: /^[a-zA-Z0-9-\\]{3,20}$/, // Only letters (upper or lower case), numbers, hyphens and backslashes, length between 3 and 20 characters
  phoneRegex:
    /^[-()\s]*\d[-()\s]*\d[-()\s]*\d[-()\s]*\d[-()\s]*\d[-()\s]*\d[-()\s]*\d[-()\s]*\d[-()\s]*\d[-()\s]*\d[-()\s]*$/, // Accepts exactly 10 digits with optional hyphens, spaces, and round brackets in any position between, before, or after digits
  extensionRegex: /^\d{1,7}$/, // Phone extension: allows 1 to 7 digits
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // General email pattern: non-whitespace characters, followed by '@', a domain name, and a valid top-level domain
  passwordRegex: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, // Requires at least 8 characters, with at least one upper case, one lower case, one number, and one special character, no spaces allowed
  linkedInRegex: /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/, // Valid LinkedIn profile URL: must start with "https://www.linkedin.com/in/" followed by alphanumeric characters or hyphens
  linkedInIdentifierRegex: /^[a-zA-Z0-9-]+\/?$/, // LinkedIn profile identifier: allows alphanumeric characters and hyphens, with an optional trailing slash
  passportNumberRegex: /^[A-Z][0-9]{7}$/, // Valid passport number: starts with one uppercase letter, followed by exactly 7 digits (for example: A1234567)
  eadNumberRegex: /^[A-Z]{3}[0-9]{10}$/, // EAD card number: starts with exactly 3 uppercase letters, followed by exactly 10 digits (e.g., ABC1234567890)
  ssnRegex: /^\d{9}$/, // SSN: Allows exactly 9 digits (e.g., 123456789)
  licenseNumberRegex: /^[A-Z0-9]{5,15}$/, // License number: allows 5 to 15 alphanumeric characters (uppercase letters and digits)
  stateIDNumberRegex: /^[A-Z0-9]{5,15}$/, // State ID number: similar to license number, allows 5 to 15 alphanumeric characters (uppercase letters and digits)
  skypeIDRegex: /^[a-zA-Z][a-zA-Z0-9_.,-:]{5,31}$/, // Skype ID: must start with a letter, followed by 5 to 31 characters that can include letters, digits, underscores, commas, periods, hyphens, and colons
  zipCodeRegex: {
    usa: /^\d{5}(-\d{4})?$/, // US ZIP code: exactly 5 digits, optionally followed by a hyphen and exactly 4 more digits
    india: /^\d{6}$/, // Indian ZIP code: exactly 6 digits
    canada: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, // Canada ZIP code: alternating letters and digits, with optional space/hyphen
    australia: /^\d{4}$/, // Australia ZIP code: exactly 4 digits
    mexico: /^\d{5}$/, // Mexico ZIP code: exactly 5 digits
    others: null, // No validation for other countries
  },
  sevisIDRegex: /^N[0-9]{10}$/, // Starts with "N" followed by exactly 10 digits

  /**
   * dateRegex: Validates dates where unknown parts can be represented by '00'.
   *
   * - Format: MM/DD/YYYY
   * - Month (MM): Allows '00' for unknown month or valid two-digit months (01-12).
   * - Day (DD): Allows '00' for unknown day or valid two-digit days (01-31).
   * - Year (YYYY): Allows '0000' for unknown year or any valid four-digit year.
   *
   * Examples of valid dates:
   * - 00/12/2024 (Unknown month, known day and year)
   * - 03/00/2024 (Known month, unknown day, known year)
   * - 03/12/0000 (Known month and day, unknown year)
   * - 00/00/0000 (Completely unknown date)
   */
  dateRegex: /^(00|[0-9]{2})\/(00|[0-9]{2})\/(0000|\d{4})$/,
  /**
   * urlRegex: Validates general URLs.
   *
   * - Must start with "http://" or "https://".
   * - Followed by a valid domain name, which can include subdomains.
   * - Allows optional port numbers, query parameters, fragments, and paths.
   *
   * Examples of valid URLs:
   * - https://www.example.com
   * - http://subdomain.example.com:8080/path?query=value#fragment
   * - https://example.org
   */
  urlRegex: /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/,
};

/**
 * Loading Action Types
 *
 * Defines keys for loading states to manage different loading contexts.
 *
 * @property {string} APP - App-level loading state.
 * @property {string} BUTTON - Button-level loading state.
 * @property {string} FETCH - Fetch-related loading state.
 */
export const LOADING_ACTION_TYPES = {
  APP: "APP",
  BUTTON: "BUTTON",
  FETCH: "FETCH",
};

/**
 * Status Action Types
 *
 * Defines keys for managing status updates in global state.
 *
 * @property {string} UPDATE - Action type to update the status.
 * @property {string} RESET - Action type to reset the status.
 */
export const STATUS_ACTION_TYPES = {
  UPDATE: "UPDATE_STATUS",
  RESET: "RESET_STATUS",
};

/**
 * UI Action Types
 *
 * Defines keys for managing UI-related actions within global state.
 *
 * @property {string} UPDATE_SEARCH_TERM - Action type for updating the search term.
 * @property {string} UPDATE_PAGINATION - Action type for pagination updates.
 * @property {string} UPDATE_REFETCH_URL - Action type for updating the refetch URL.
 * @property {string} ENABLE_REFETCH - Action type to enable refetching.
 * @property {string} DISABLE_REFETCH - Action type to disable refetching.
 * @property {string} RESET_ALL - Action type to reset the entire UI state.
 * @property {string} UPDATE_CANDIDATES_PER_PAGE - Action type to update candidates per page.
 * @property {string} UPDATE_SELECTED_STATUSES - Action type to update selected statuses in the table.
 * @property {string} SHOW_SIDE_BAR - Action type to show the side bar.
 * @property {string} HIDE_SIDE_BAR - Action type to hide the side bar.
 * @property {string} UPDATE_SIDE_BAR_RECORD_ID - Action type to update the side bar's record ID to display its status history.
 * @property {string} UPDATE_USERNAMES - Action type to update the all available user names.
 */
export const UI_ACTION_TYPES = {
  UPDATE_SEARCH_TERM: "UPDATE_SEARCH_TERM",
  UPDATE_PAGINATION: "UPDATE_PAGINATION",
  UPDATE_REFETCH_URL: "UPDATE_REFETCH_URL",
  ENABLE_REFETCH: "ENABLE_REFETCH",
  DISABLE_REFETCH: "DISABLE_REFETCH",
  RESET_ALL: "RESET_ALL",
  UPDATE_CANDIDATES_PER_PAGE: "UPDATE_CANDIDATES_PER_PAGE",
  UPDATE_SELECTED_STATUSES: "UPDATE_SELECTED_STATUSES",
  SHOW_SIDE_BAR: "SHOW_SIDE_BAR",
  HIDE_SIDE_BAR: "HIDE_SIDE_BAR",
  UPDATE_SIDE_BAR_RECORD_ID: "UPDATE_SIDE_BAR_RECORD_ID",
  UPDATE_USERNAMES: "UPDATE_USERNAMES",
};
