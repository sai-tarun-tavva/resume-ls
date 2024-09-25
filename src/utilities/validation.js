export const candidateValidations = {
  name: (value, enteredValue) => {
    if (value && enteredValue === "") return "Name cannot be empty.";
  },
  phone: (value, enteredValue) => {
    const digitsOnly = enteredValue.replace(/\s+/g, "");
    const phonePattern = /^\d{10}$/;
    if (value && enteredValue === "") return "Phone number cannot be empty.";
    if (enteredValue && !phonePattern.test(digitsOnly))
      return "Phone number must contain only 10 digits.";
  },
  email: (value, enteredValue) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern
    if (value && enteredValue === "") return "Email cannot be empty.";
    if (enteredValue && !emailPattern.test(enteredValue))
      return "Please enter a valid email address.";
  },
  linkedIn: (value, enteredValue) => {
    const linkedInPattern =
      /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/; // https://www.linkedin.com/in/your-profile
    // if (value === "" && enteredValue === "") return;
    if (value && enteredValue === "") return "LinkedIn URL cannot be empty.";
    if (enteredValue && !linkedInPattern.test(enteredValue))
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
