import { formatFileSize } from "./utilities";
import { END_POINTS } from "../constants";

/**
 * Makes an API call using the provided URL and options, including handling of the access token.
 *
 * @async
 * @function
 * @param {string} url - The URL to which the request is sent.
 * @param {Object} [options={}] - Optional fetch options, including headers and method.
 * @returns {Promise<Response>} The fetch response, potentially retried with a new access token if the first attempt fails due to token expiration.
 */
export const fetchWithToken = async (url, options = {}) => {
  let accessToken = sessionStorage.getItem("accessToken");

  // If access token is missing, try refreshing it
  if (!accessToken) {
    const refreshStatus = await refreshAccessToken();
    if (refreshStatus === "success") {
      accessToken = sessionStorage.getItem("accessToken");
    } else {
      // Clear storage and redirect to login if token refresh fails
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = `/`; // Adjust the path as necessary
      return; // Prevent further execution
    }
  }

  // Add Authorization header if it's not already provided
  if (!options.headers) {
    options.headers = {};
  }
  options.headers.Authorization = `Bearer ${accessToken}`;

  // Make the actual API call
  const response = await fetch(url, options);

  // If access token is expired (401), try refreshing and retry the request
  if (response.status === 401) {
    const refreshStatus = await refreshAccessToken();
    if (refreshStatus === "success") {
      accessToken = sessionStorage.getItem("accessToken");

      // Retry the original request with the new access token
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(url, options);
    } else {
      // Clear storage and redirect to login if refresh fails
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = `/`; // Adjust the path as necessary
      return; // Prevent further execution
    }
  }

  return response;
};

/**
 * Refreshes the access token by making a POST request to the refresh token endpoint.
 *
 * @async
 * @function
 * @returns {Promise<string>} Returns "success" if the refresh token is valid and a new access token is received, otherwise "failure".
 */
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return "failure";

  try {
    const response = await fetch(END_POINTS.WELCOME.REFRESH_TOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("accessToken", data.access);
      return "success";
    } else {
      console.error("Failed to refresh access token");
      return "failure";
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return "failure";
  }
};

/**
 * Authenticates a user by making a POST request to the given URL with the provided body data.
 *
 * @async
 * @function
 * @param {string} url - The URL to which the request is sent.
 * @param {Object} body - The request body containing authentication details.
 * @returns {Promise<Object>} The response status and data from the server.
 */
export const authenticateUser = async (url, body) => {
  const response = { status: null, data: null };
  try {
    const fetchResponse = await fetch(url, {
      method: "POST",
      body,
    });

    const resData = await fetchResponse.json();

    response.status = fetchResponse.status;
    response.data = resData;

    // Return the response data and status
    return response;
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Server or network issue:", error.message);
    return response;
  }
};

/**
 * Logs out the user by invalidating the refresh token and clearing session storage.
 *
 * @async
 * @function
 * @returns {Promise<void>} Logs out the user and clears session/local storage.
 */
export const handleLogout = async () => {
  try {
    // Get the refresh token from localStorage
    const refreshToken = localStorage.getItem("refreshToken");
    const body = new FormData();
    body.append("token", refreshToken);

    if (refreshToken) {
      // Make an API request to your backend to invalidate/blacklist the refresh token
      const response = await fetchWithToken(END_POINTS.WELCOME.LOGOUT, {
        method: "POST",
        body,
      });

      if (!response.ok) {
        // Clear tokens from sessionStorage and localStorage
        console.error("Failed to logout", response.statusText);
      }
    } else {
      console.error("No refresh token found in localStorage");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
  sessionStorage.clear();
  localStorage.clear();
};

/**
 * Fetches the PDF resume from the server.
 *
 * @returns {Promise<Object>}
 *          An object containing the HTTP status and PDF details, or null if an error occurs.
 */
export const fetchPdf = async (id) => {
  try {
    const response = await fetchWithToken(
      `${END_POINTS.INSIGHT.VIEW_RESUME}${id}/`,
      {
        method: "GET",
      }
    );

    // Check if response is ok
    if (!response.ok) {
      console.error("Error fetching PDF:", response.statusText);
      return { status: response.status, data: null };
    }

    // Extract the 'Content-Disposition' header
    const contentDisposition = response.headers.get("Content-Disposition");

    // Parse the filename from the header
    let fileName = "unknown.pdf"; // Default in case filename is not found
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        fileName = filenameMatch[1];
      }
    }

    const blob = await response.blob();

    if (blob.size === 0) {
      console.error("Received empty blob.");
      return { status: 500, data: null };
    }

    const fileSize = formatFileSize(blob.size); // File size in bytes
    const url = URL.createObjectURL(blob);

    const fileType = blob.type; // e.g., application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document
    if (fileType === "application/pdf") {
      // For PDF files, use iframe
      return {
        status: response.status,
        data: { name: fileName, size: fileSize, url, isPdf: true },
      };
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "text/plain"
    ) {
      // For DOC/DOCX files, you can choose to display them differently.
      // Here, we can also use an iframe, but it might not render directly. Use a service or viewer if needed.
      return {
        status: response.status,
        data: { name: fileName, size: fileSize, url, isPdf: false },
      };
    }
  } catch (error) {
    // Handle any server or network issue
    console.error("Server or network issue:", error.message);
    return { status: 500, data: null };
  }
};

/**
 * Fetches the list of candidates from the API.
 *
 * @async
 * @function
 * @param {string} url - The URL to which the request is sent.
 * @returns {Promise<Object>} An object containing the response status and an array of candidate data.
 */
export const fetchCandidates = async (url) => {
  try {
    const response = await fetchWithToken(url, {
      method: "GET",
    });
    const resData = await response.json();

    // Return the response data and status
    return { status: response.status, data: resData };
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Server or network issue:", error.message);
    return { status: 500, data: null };
  }
};

/**
 * Edits the information of a candidate by making a PUT request to the given endpoint.
 *
 * @async
 * @function
 * @param {number} id - The ID of the candidate to be edited.
 * @param {Object} body - The request body containing updated candidate information.
 * @returns {Promise<Object>} An object containing the response status and updated candidate data.
 */
export const editCandidate = async (id, body) => {
  try {
    // Make the API request to update candidate data
    const response = await fetchWithToken(
      END_POINTS.INSIGHT.EDIT_CANDIDATE.replace("{{id}}", id),
      {
        method: "PUT",
        body,
      }
    );

    const { data } = await response.json();

    // Return the response data and status
    return { status: response.status, data };
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Server or network issue:", error.message);
    return { status: 500 };
  }
};

/**
 * Uploads files to the server by making a POST request with the provided body data.
 *
 * @async
 * @function
 * @param {Object} body - The form data containing files to be uploaded.
 * @returns {Promise<Object>} An object containing the response status.
 */
export const uploadFiles = async (body) => {
  try {
    // Make the API request to upload files
    const response = await fetchWithToken(END_POINTS.INSIGHT.UPLOAD_RESUME, {
      method: "POST",
      body,
    });

    // Return the response data and status
    return { status: response.status };
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Server or network issue:", error.message);
    return { status: 500 };
  }
};

/**
 * Fetches the list of suggested skills from the API.
 *
 * @async
 * @function
 * @param {String} param - The string to be searched for in skill set.
 * @returns {Promise<Object>} An object containing the response status and an array of candidate data.
 */
export const fetchSuggestedSkills = async (param) => {
  try {
    const response = await fetchWithToken(
      `${END_POINTS.INSIGHT.FETCH_SUGGESTED_SKILLS}${param}`,
      {
        method: "GET",
      }
    );
    const resData = await response.json();

    // Return the response data and status
    return { status: response.status, data: resData.skills };
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Server or network issue:", error.message);
    return { status: 500, data: null };
  }
};

/**
 * Appends the new skill into backend's skill list.
 *
 * @async
 * @function
 * @param {Object} body - The request body containing new skill to be added.
 * @returns {Promise<Object>} An object containing the response status.
 */
export const createNewSkill = async (body) => {
  try {
    const response = await fetchWithToken(END_POINTS.INSIGHT.CREATE_NEW_SKILL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Return status
    if (!response.ok) {
      return { status: 500 };
    }

    return { status: response.status };
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Server or network issue:", error.message);
    return { status: 500 };
  }
};
