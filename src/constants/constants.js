export const ITEMS_PER_PAGE = 20;
export const MAX_FILES = 30;

export const REGEX = {
  usernameRegex: /^[a-zA-Z-]+$/, // Only letters and hyphens
  phoneRegex: /^\d{10}$/, // Exactly 10 digits
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // General email pattern
  passwordRegex: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/, // General password validation
  linkedInRegex: /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/, // https://www.linkedin.com/in/your-profile
};
