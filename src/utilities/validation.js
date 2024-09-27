// Global validation regex patterns
const usernameRegex = /^[a-zA-Z-]+$/; // Only letters and hyphens
const phoneRegex = /^\d{10}$/; // Exactly 10 digits
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // General email pattern
const passwordRegex =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/; // General password validation
const linkedInRegex = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/; // https://www.linkedin.com/in/your-profile

export const candidateValidations = {
  name: (value, enteredValue) => {
    if (value && enteredValue === "") return "Name cannot be empty.";
  },
  phone: (value, enteredValue) => {
    const digitsOnly = enteredValue.replace(/\s+/g, "");
    if (value && enteredValue === "") return "Phone number cannot be empty.";
    if (enteredValue && !phoneRegex.test(digitsOnly))
      return "Phone number must contain exactly 10 digits.";
  },
  email: (value, enteredValue) => {
    if (value && enteredValue === "") return "Email cannot be empty.";
    if (enteredValue && !emailRegex.test(enteredValue))
      return "Please enter a valid email address.";
  },
  linkedIn: (value, enteredValue) => {
    if (value && enteredValue === "") return "LinkedIn URL cannot be empty.";
    if (enteredValue && !linkedInRegex.test(enteredValue))
      return "Please enter a valid LinkedIn profile URL.";
  },
  city: (value, enteredValue) => {
    if (value && enteredValue === "") return "City cannot be empty.";
  },
  state: (value, enteredValue) => {
    if (value && enteredValue === "") return "State cannot be empty.";
  },
  experience: (value, enteredValue) => {
    const experienceNumber = Number(enteredValue);
    if (value && enteredValue === "") return "Experience cannot be empty.";
    if (enteredValue && (experienceNumber < 0 || experienceNumber > 100))
      return "Experience must be between 0 and 100.";
  },
};

export const loginValidations = {
  userName: (value) => {
    if (value === "") return "Username is required.";
    if (!usernameRegex.test(value))
      return "Username can only contain letters and hyphens.";
    if (value.length < 3 || value.length > 20)
      return "Username must be 3-20 characters long.";
  },
  password: (value) => {
    if (value === "") return "Password is required.";
    if (!passwordRegex.test(value))
      return "Include 8+ chars, upper, lower, number, symbol.";
  },
};

export const signupValidations = {
  userName: (value) => {
    if (value === "") return "Username is required.";
    if (!usernameRegex.test(value))
      return "Username can only contain letters and hyphens.";
    if (value.length < 3 || value.length > 20)
      return "Username must be 3-20 characters long.";
  },
  password: (value) => {
    if (value === "") return "Password is required.";
    if (!passwordRegex.test(value))
      return "Include 8+ chars, upper, lower, number, symbol.";
  },
  email: (value) => {
    if (value === "") return "Email is required.";
    if (!emailRegex.test(value)) return "Please enter a valid email address.";
  },
};
