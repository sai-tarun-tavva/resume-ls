import { END_POINTS, INSIGHT } from "../constants";

/**
 * Builds the URL for fetching candidates based on the query, limit, and page parameters.
 * @param {string} [query=""] - The search query to filter candidates (optional).
 * @param {string} [limit=""] - The maximum number of candidates to retrieve (optional).
 * @param {string} [page=""] - The page number for pagination (optional).
 * @returns {string} The dynamically built URL with encoded query parameters.
 */
export const buildFetchCandidatesUrl = (limit = "", page = "", query = "") => {
  // Encode query params to ensure special characters are handled
  const encodedLimit = encodeURIComponent(limit);
  const encodedPage = encodeURIComponent(page);
  const encodedQuery = encodeURIComponent(query);

  const { url, params } = END_POINTS.FETCH_CANDIDATES; // Destructure to get the base URL and parameters

  // Create a new URL object for constructing the complete URL
  const fetchUrl = new URL(url);

  // Set query parameters using the defined params and the values for limit and page
  fetchUrl.searchParams.set(params.limit, encodedLimit);
  fetchUrl.searchParams.set(params.page, encodedPage);
  fetchUrl.searchParams.set(params.query, encodedQuery);

  // Convert URL object back to string
  return fetchUrl.toString();
};

/**
 * Checks if the file type and size are valid.
 * @param {File} file - The file to check.
 * @returns {boolean} True if the file type and size are valid, false otherwise.
 */
export const isValidFile = (file) => {
  const validTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  // Convert the file size from MB to bytes
  const maxSizeInBytes = INSIGHT.MAX_FILE_SIZE * 1024 * 1024;

  // Check file type and file size
  const isValidType = validTypes.includes(file.type);
  const isValidSize = file.size <= maxSizeInBytes;

  return isValidType && isValidSize;
};

/**
 * Highlights the matching text within a given string.
 * @param {string} text - The text to search and highlight within.
 * @param {string} highlight - The text to highlight, which can include multiple terms separated by commas.
 * @returns {JSX.Element} The text with highlighted matches.
 */
export const highlightText = (text, highlight) => {
  if (!highlight) return text;

  // Split the highlight string by commas and trim whitespace
  const highlightTerms = highlight.split(",").map((term) => term.trim());

  // Create a regular expression to match any of the highlight terms (case insensitive)
  const regex = new RegExp(`(${highlightTerms.join("|")})`, "gi");

  // Split the text based on the regex
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        // Check if the current part matches any highlight term
        const isHighlighted = highlightTerms.some(
          (term) => part.toLowerCase() === term.toLowerCase()
        );
        return isHighlighted ? <mark key={index}>{part}</mark> : part;
      })}
    </span>
  );
};

/**
 * Replaces route parameters in a given route string with actual parameter values.
 * @param {string} route - The route string with parameters.
 * @param {Object} params - An object containing the parameters to replace.
 * @returns {string} The route string with parameters replaced.
 */
export const replaceRouteParam = (route, params) => {
  return Object.keys(params).reduce((acc, key) => {
    return acc.replace(`:${key}`, params[key]);
  }, route);
};

/**
 * Checks if a candidate is new based on the date they were created.
 * @param {Date} dateCreated - The date the candidate was created.
 * @returns {boolean} True if the candidate is new, false otherwise.
 */
export const isCandidateNew = (dateCreated) => {
  return Date.now() - dateCreated.getTime() < 7 * 24 * 60 * 60 * 1000; // less than 7 days
};

/**
 * Resets the status asynchronously.
 * @param {function} action - The action to dispatch.
 * @returns {Promise<void>} A promise that resolves after the status is reset.
 */
export const resetStatusAsync = (action) => (dispatch) => {
  return new Promise((resolve) => {
    dispatch(action());
    resolve(); // Resolve after resetting status
  });
};

/**
 * Calculates a human-readable time ago string from a date.
 * @param {Date} date - The date to compare against the current time.
 * @returns {string} A string representing how long ago the date was.
 */
export const calculateTimeAgo = (date) => {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval > 1 ? "s" : ""} ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval > 1 ? "s" : ""} ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval > 1 ? "s" : ""} ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} minute${interval > 1 ? "s" : ""} ago`;

  return `${Math.floor(seconds)} second${seconds > 1 ? "s" : ""} ago`;
};

/**
 * Returns the appropriate file icon based on the file extension.
 * @param {string} fileName - The name of the file.
 * @returns {JSX.Element} The icon for the file type.
 */
export const getFileIcon = (fileName) => {
  const fileExtension = fileName.split(".").pop().toLowerCase();
  switch (fileExtension) {
    case "doc":
    case "docx":
      return <i className="bi bi-file-earmark-word"></i>; // Word Icon
    case "pdf":
      return <i className="bi bi-file-earmark-pdf"></i>; // PDF Icon
    default:
      return <i className="bi bi-file-earmark"></i>; // Generic file icon
  }
};

/**
 * Formats a file size from bytes to a human-readable string.
 * @param {number} sizeInBytes - The size of the file in bytes.
 * @returns {string} The formatted file size.
 */
export const formatFileSize = (sizeInBytes) => {
  const sizeInKB = sizeInBytes / 1024;
  if (sizeInKB < 1024) {
    return `${sizeInKB.toFixed(2)} KB`;
  } else {
    const sizeInMB = sizeInKB / 1024;
    return `${sizeInMB.toFixed(2)} MB`;
  }
};

/**
 * Capitalizes the first letter of each word in a string.
 * @param {string} text - The text to transform.
 * @returns {string} The transformed text with capitalized first letters.
 */
export const capitalizeFirstLetter = (text) =>
  text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

/**
 * Transforms and sorts candidate data based on timestamp.
 * @param {Array<Object>} data - The array of candidate objects.
 * @returns {Array<Object>} The transformed candidate objects.
 */
export const transformData = (data) => {
  return data.map((candidate) => ({
    ...candidate,
    skills: candidate.skills
      ? candidate.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill)
      : [], // Return an empty array if skills are empty or falsy
  }));
};

/**
 * Checks if two arrays are equal.
 * @param {Array} arr1 - The first array to compare.
 * @param {Array} arr2 - The second array to compare.
 * @returns {boolean} True if arrays are equal, false otherwise.
 */
export const arraysEqual = (arr1, arr2) => {
  if (
    !Array.isArray(arr1) ||
    !Array.isArray(arr2) ||
    arr1?.length !== arr2?.length
  )
    return false;
  const sortedArr1 = [...arr1].sort();
  const sortedArr2 = [...arr2].sort();
  return sortedArr1.every((value, index) => value === sortedArr2[index]);
};

/**
 * Transforms a phone number into a formatted string with either
 * +1 (xxx) xxx-xxxx or (xxx) xxx-xxxx format.
 * @param {string} value - The phone number as a string.
 * @param {boolean} isCountryCode - If true, includes the country code (+1).
 * @returns {string} The formatted phone number, or the original if not valid.
 */
export const transformPhoneNumber = (value, isCountryCode = false) => {
  // Remove all spaces and hyphens from the input
  const digitsOnly = value.replace(/[\s()-]+/g, "");

  // Ensure we only reformat if we have exactly 10 digits
  if (digitsOnly.length !== 10) {
    return value; // Return the original input if it's not exactly 10 digits
  }

  // Format the string based on the isCountryCode flag
  if (isCountryCode) {
    return `+1 (${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(
      3,
      6
    )}-${digitsOnly.slice(6)}`;
  } else {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(
      3,
      6
    )}-${digitsOnly.slice(6)}`;
  }
};

/**
 * Transforms the experience value to a rounded number.
 * @param {string|number} value - The experience value as a string or number.
 * @returns {number|string} The rounded experience value or an empty string for invalid inputs.
 */
export const transformExperience = (value) => {
  // Ensure the value is a number
  const num = Number(value);

  // Check if the number is valid
  if (value === "" || isNaN(num)) {
    return ""; // or handle invalid number cases as needed
  }

  return Math.round(num);
};
