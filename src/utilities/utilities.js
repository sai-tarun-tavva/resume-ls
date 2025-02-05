import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { INSIGHT } from "../constants";

/**
 * Builds the URL for fetching candidates based on the query, limit, and page parameters.
 * @param {string} [query=""] - The search query to filter candidates (optional).
 * @param {string} [limit=""] - The maximum number of candidates to retrieve (optional).
 * @param {string} [page=""] - The page number for pagination (optional).
 * @returns {string} The dynamically built URL with encoded query parameters.
 */
export const buildFetchCandidatesUrl = (
  endPoint = "",
  limit = "",
  page = "",
  query = "",
  statuses = ""
) => {
  // Encode query params to ensure special characters are handled
  const encodedLimit = encodeURIComponent(limit);
  const encodedPage = encodeURIComponent(page);

  // Destructure to get the base URL and parameters
  const { url, params } = endPoint;

  // Create a new URL object for constructing the complete URL
  const fetchUrl = new URL(url);

  // Set the limit and page parameters using the defined params and values for limit and page
  fetchUrl.searchParams.set(params.limit, encodedLimit);
  fetchUrl.searchParams.set(params.page, encodedPage);

  // Conditionally append the query parameter if it's provided
  let finalUrl = fetchUrl.toString();
  if (query) {
    finalUrl += `&${params.query}=${query}`;
  }
  if (statuses) {
    finalUrl += `&${params?.statuses}=${statuses}`;
  }

  return finalUrl;
};

/**
 * Joins selected statuses into a comma-separated string based on their corresponding labels.
 *
 * @param {Array} options - Array of status options with label-value pairs.
 * @param {Object} statuses - Object with boolean values indicating which statuses are selected.
 * @returns {string} A comma-separated string of selected status labels.
 */
export const getStatusesAsJoinedString = (options, statuses) => {
  return Object.keys(statuses)
    .filter((key) => statuses[key])
    .map((key) => getLabelByValue(options, key))
    .join(",");
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
 * Calculates and returns the date exactly 18 years ago from today.
 * The returned date is formatted as YYYY-MM-DD.
 *
 * @returns {string} The date 18 years ago in the format YYYY-MM-DD.
 */
export const getEighteenYearsAgoDate = () => {
  const today = new Date();
  // Subtract 18 years from today's date
  today.setFullYear(today.getFullYear() - 18);
  // Return the date in the YYYY-MM-DD format
  return today.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
};

/**
 * Highlights the matching text within a given string.
 * @param {string} text - The text to search and highlight within.
 * @param {string} highlight - The text to highlight, which may or may not contain terms inside quotes.
 * @returns {JSX.Element} The text with highlighted matches.
 */
export const highlightText = (text, highlight) => {
  if (!highlight) return text;

  const extractQuotedTerms = (input) => {
    const quoteRegex = /"([^"]+)"/g; // Regex to extract terms inside quotes
    const terms = [];
    let match;
    while ((match = quoteRegex.exec(input)) !== null) {
      terms.push(match[1]); // Extract the content inside quotes
    }
    return terms;
  };

  // Remove logical operators and parentheses, then split remaining terms
  const cleanHighlight = highlight
    .replace(/[()]/g, "") // Remove parentheses
    .replace(/\b(AND|OR|and|or)\b/g, "") // Remove logical operators
    .trim();

  const quotedTerms = extractQuotedTerms(cleanHighlight); // Extract terms inside quotes
  const plainTerms = cleanHighlight.replace(/"([^"]+)"/g, "").split(/[\s,]+/); // Remove quoted terms and split by space/comma
  const allTerms = [
    ...quotedTerms,
    ...plainTerms.filter((term) => term.trim()),
  ]; // Combine quoted and plain terms

  if (allTerms.length === 0) return text;

  // Create a regular expression to match any of the highlight terms (case insensitive)
  const regex = new RegExp(`(${allTerms.join("|")})`, "gi");

  // Split the text based on the regex
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        // Check if the current part matches any highlight term
        const isHighlighted = allTerms.some(
          (term) => part.toLowerCase() === term.toLowerCase()
        );
        return isHighlighted ? <mark key={index}>{part}</mark> : part;
      })}
    </span>
  );
};

/**
 * Filters an array of skills to return those that start with or contain the search key.
 * Skills that start with the search key are prioritized over those that just contain it.
 *
 * @param {string} searchKey - The key to filter skills by.
 * @param {Array<string>} skills - The list of skills to filter.
 * @returns {Array<string>} - An array of filtered skills, starting with those that match the search key.
 */
export const filterSkills = (searchKey, skills) => {
  // Convert searchKey to lowercase for case-insensitive comparison
  const keyLower = searchKey.toLowerCase();

  // Filter skills that start with the search key
  const startsWithSearchKey = skills.filter((skill) =>
    skill.toLowerCase().startsWith(keyLower)
  );

  // Filter skills that contain the search key but don't start with it
  const containsSearchKey = skills.filter(
    (skill) =>
      skill.toLowerCase().includes(keyLower) &&
      !skill.toLowerCase().startsWith(keyLower)
  );

  // Combine the two lists, starting with those that start with the search key
  return [...startsWithSearchKey, ...containsSearchKey];
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
 * Formats a time duration in seconds into a MM:SS string format.
 * @param {number} seconds - The duration in seconds to format.
 * @returns {string} The formatted time in MM:SS format.
 */

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
};

/**
 * Dispatches the action synchronously.
 * @param {function} action - The action to dispatch.
 * @returns {Promise<void>} A promise that resolves after the action is dispatched.
 */
export const dispatchAsync = (action) => {
  return new Promise((resolve) => {
    // Dispatching the action
    action();
    resolve(); // Resolve after dispatching the action
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
 * Converts an ISO date string to a human-readable formatted date in a U.S. time zone.
 * @param {string} dateStr - The ISO date string to be formatted.
 * @param {boolean} includeTime - Whether to include the time in the output.
 * @returns {string} A formatted date string in the "MMM DD, YYYY hh:mm:ss AM/PM" format.
 */
export const convertDate = (dateStr, includeTime = true) => {
  if (!dateStr) return "";

  let date;
  if (!includeTime) {
    const [year, month, day] = dateStr.split("-").map(Number);
    date = new Date(year, month - 1, day);
  } else {
    date = new Date(dateStr);
  }

  const timeZone = "America/New_York"; // Change this to "America/Los_Angeles" for Pacific Time

  let options = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone,
  };

  if (includeTime) {
    options = {
      ...options,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
  }

  return date.toLocaleString("en-US", options);
};

/**
 * Handles the process of generating and downloading a PDF file with plain text content.
 *
 * This function accepts an array of text strings, organizes them into a PDF layout,
 * and ensures proper pagination. Each line is wrapped to fit within the margins
 * of the PDF and spans multiple pages if necessary.
 *
 * @param {string[]} overview - An array of strings representing the content to include in the PDF.
 */
export const handleTextDownloadAsPDF = async (overview) => {
  if (!overview || overview.length === 0) {
    alert("No content to download.");
    return;
  }

  try {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210; // A4 width in mm
    const margin = 10; // 10mm margin on each side
    const usableWidth = pageWidth - 2 * margin;
    const lineHeight = 10; // Line height in mm
    const fontSize = 12;

    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(fontSize);

    let yOffset = margin;

    overview.forEach((line) => {
      const splitText = pdf.splitTextToSize(line, usableWidth);

      splitText.forEach((text) => {
        if (yOffset + lineHeight > pdf.internal.pageSize.height - margin) {
          pdf.addPage(); // Add a new page if we're out of space
          yOffset = margin;
        }
        pdf.text(text, margin, yOffset);
        yOffset += lineHeight;
      });
    });

    pdf.save("overview_content.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Please check the console for details.");
  }
};

/**
 * Formats a given timestamp into a user-friendly string in the "America/New_York" timezone.
 * @param {number|string|Date} timestamp - The timestamp to format. Can be a number (milliseconds since epoch),
 *                                         a string (parsable by Date), or a Date object.
 * @returns {string} The formatted timestamp as a string (e.g., "Jan 11, 3:00 PM").
 */
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "America/New_York",
  });
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
    arr1.length !== arr2.length
  )
    return false;

  // Sort the arrays to ensure the order does not affect equality
  const sortedArr1 = [...arr1].sort((a, b) => {
    // Use JSON.stringify for object comparison, fallback to string comparison
    return typeof a === "object" && typeof b === "object"
      ? JSON.stringify(a).localeCompare(JSON.stringify(b))
      : a.localeCompare(b);
  });

  const sortedArr2 = [...arr2].sort((a, b) => {
    return typeof a === "object" && typeof b === "object"
      ? JSON.stringify(a).localeCompare(JSON.stringify(b))
      : a.localeCompare(b);
  });

  // Use areObjectsEqual for comparing objects or primitive values
  return sortedArr1.every((value, index) => {
    return typeof value === "object"
      ? areObjectsEqual(value, sortedArr2[index])
      : value === sortedArr2[index]; // For primitive values
  });
};

/**
 * Checks if two objects are equal.
 * @param {Object} obj1 - The first object to compare.
 * @param {Object} obj2 - The second object to compare.
 * @returns {boolean} True if objects are equal, false otherwise.
 */
export const areObjectsEqual = (obj1, obj2) => {
  // Check if both are objects (and not null)
  if (obj1 === obj2) return true; // Check for reference equality
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false; // One is not an object
  }

  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) return false;

  // Check if values are equal for each key
  for (let key of keys1) {
    // Check if the key exists in both objects
    if (!keys2.includes(key)) return false;

    // Recursively check for deep equality
    const value1 = obj1[key];
    const value2 = obj2[key];

    // If the value is an object or an array, perform a deep comparison
    if (typeof value1 === "object" && typeof value2 === "object") {
      if (!areObjectsEqual(value1, value2)) return false; // Deep comparison
    } else if (value1 !== value2) {
      return false; // Primitive value comparison
    }
  }

  return true; // Objects are equal
};

/**
 * Function to get the experience display text for a candidate.
 * @param {number} years - Years of experience.
 * @param {number} months - Months of experience.
 * @returns {string} - Formatted experience text.
 */
export const getExperienceDisplayText = (years, months) => {
  if (years && months) {
    return `${years}Y ${months}M`;
  } else if (years) {
    return `${years}Y`;
  } else if (months) {
    return `${months}M`;
  } else {
    return "0Y 0M";
  }
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
  const digitsOnly = value?.replace(/[\s()-]+/g, "");

  // Ensure we only reformat if we have exactly 10 digits
  if (digitsOnly?.length !== 10) {
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
 * Focuses on the first element in the provided section reference that has an error.
 * If no element with an error is found, no action is taken.
 *
 * @param {Object} sectionRef - A reference object pointing to the section DOM element.
 * @returns {void} This function does not return a value.
 */
export const focusErrorsIfAny = (sectionRef) => {
  const firstErrorElement = sectionRef.current.querySelector(
    "[data-error='true']"
  );
  firstErrorElement?.focus();
};

/**
 * Extracts and returns only the numeric digits from a given string.
 * Removes all non-digit characters, including spaces, and trims the result.
 *
 * @param {string} value - The input string from which digits are to be extracted.
 * @returns {string} A string containing only the numeric digits from the input.
 */
export const extractOnlyDigits = (value) => {
  return value.replace(/\D/g, "").trim();
};

/**
 * Validates an array of error states and value states.
 * @param {Array} errors - An array of error states to check if they are falsy.
 * @param {Array} values - An array of values to check if they are truthy (not empty).
 * @returns {boolean} True if all errors are falsy and all values are truthy, false otherwise.
 */
export const determineSectionValidity = (errors, values) => {
  const noErrors = errors.every((error) => !error); // No errors should be present
  const allValuesPresent = values.every((value) => value); // All values must be present
  return noErrors && allValuesPresent;
};

/**
 * Transforms a Social Security Number (SSN) into the •••-••-xxxx format.
 * @param {string} value - The SSN as a string.
 * @returns {string} The masked SSN in •••-••-xxxx format, or the original if not valid.
 */
export const transformSSN = (value) => {
  // Remove all spaces and hyphens from the input
  const digitsOnly = value.replace(/[\s-]+/g, "");

  // Ensure we only reformat if we have exactly 9 digits
  if (digitsOnly.length !== 9) {
    return value; // Return the original input if it's not exactly 9 digits
  }

  // Format the SSN into •••-••-xxxx
  return `•••-••-${digitsOnly.slice(5)}`;
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

/**
 * Retrieves the value associated with a given label from an options array.
 *
 * @param {Array} options - Array of option objects, each containing `label` and `value` properties.
 * @param {string} label - The label for which the corresponding value should be retrieved.
 * @returns {string|undefined} The value associated with the specified label, or undefined if not found.
 */
export const getValueByLabel = (options, label) => {
  return options.find((option) => option.label === label)?.value;
};

/**
 * Retrieves the label associated with a given value from an options array.
 *
 * @param {Array} options - Array of option objects, each containing `label` and `value` properties.
 * @param {string} value - The value for which the corresponding label should be retrieved.
 * @returns {string|undefined} The label associated with the specified value, or undefined if not found.
 */
export const getLabelByValue = (options, value) => {
  return options.find((option) => option.value === value)?.label;
};

/**
 * Generates empty rows for a table with a specified number of rows and columns.
 *
 * @param {number} rowLength - The number of empty rows to generate.
 * @param {number} colLength - The number of columns in each row.
 * @returns {JSX.Element[]} An array of JSX elements representing empty rows with the specified number of columns.
 */
export const getEmptyRows = (rowLength, colLength) => {
  return Array.from({
    length: rowLength,
  }).map((_, index) => (
    <tr key={`empty-${index}`} className="empty-row">
      {Array.from({ length: colLength }).map((_, index) => (
        <td key={index}>&nbsp;</td>
      ))}
    </tr>
  ));
};

/**
 * Exports data to an Excel file with specified column widths and applies basic styling.
 *
 * @param {Array} worksheetData - Array of objects representing the data to export.
 * @param {Object} columnWidths - Object specifying the width of each column by key.
 * @param {String} appName - App name to be used in creating the file name.
 */
export const exportToExcel = (worksheetData, columnWidths, appName) => {
  // Check if data is empty
  if (!worksheetData || worksheetData.length === 0) {
    // Create a worksheet with only headers based on columnWidths
    const headers = Object.keys(columnWidths);
    const emptyRow = headers.reduce((acc, header) => {
      acc[header] = "";
      return acc;
    }, {});

    worksheetData = [emptyRow]; // Add one empty row to include headers
  }

  // Convert to worksheet
  const worksheet = XLSX.utils.json_to_sheet(worksheetData, {
    header: Object.keys(columnWidths), // Explicitly specify headers
    skipHeader: false,
  });

  // Set column widths
  worksheet["!cols"] = Object.entries(columnWidths).map(([, width]) => ({
    width,
  }));

  // Apply styling
  const headerStyle = {
    font: { bold: true },
    fill: { fgColor: { rgb: "E6E6E6" } },
    alignment: { horizontal: "center" },
  };

  // Apply header styling only if we have a valid range
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  if (range) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ r: 0, c: C });
      if (worksheet[address]) {
        worksheet[address].s = headerStyle;
      }
    }

    // Apply auto filter only if we have a valid range
    worksheet["!autofilter"] = {
      ref: XLSX.utils.encode_range({
        s: { r: 0, c: 0 },
        e: { r: range.e.r, c: range.e.c },
      }),
    };
  }

  // Create workbook and append worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");

  // Write to file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    bookSST: false,
    compression: true,
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Generate filename with current date
  const filename = `${appName}Candidates_${
    new Date().toISOString().split("T")[0]
  }.xlsx`;

  saveAs(blob, filename);
};
