export const INSIGHT = {
  CANDIDATES_PER_PAGE: 20,
  MAX_FILES: 30,
  MAX_FILE_SIZE: 5, // in MB
  RESUME_VIEWER_WIDTH_START: 414,
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
  usernameRegex: /^[a-zA-Z-]+$/, // Only letters and hyphens
  phoneRegex: /^\d{1,3}[-\s]?\d{1,3}[-\s]?\d{1,4}$/, // Only 10 digits with random spaces and hyphens
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // General email pattern
  passwordRegex: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, // General password validation
  linkedInRegex: /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/, // https://www.linkedin.com/in/your-profile
};

export const LOADING_ACTION_TYPES = {
  APP: "app",
  BUTTON: "button",
  FETCH: "fetch",
};

export const STATUS_ACTION_TYPES = {
  UPDATE: "update",
  RESET: "reset",
};
