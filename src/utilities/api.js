import { formatFileSize, replaceRouteParam } from "./utilities";
import { BATCH_PROCESS_STATUS } from "../micro-frontends/Insight/constants";
import { CONTENT, END_POINTS } from "../constants";

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
      console.error("Error logging out");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
  sessionStorage.clear();
  localStorage.clear();
};

/**
 * Fetches all usernames from the API.
 *
 * @async
 * @function fetchUsernames
 * @param {string} url - The URL to fetch the usernames from.
 * @returns {Promise<{ status: number, data: Array|null }>} The status and an array of usernames, or null if an error occurs.
 */
export const fetchUsernames = async (url) => {
  try {
    const response = await fetchWithToken(url, {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Error fetching usernames:", response.statusText);
      return { status: response.status, data: null };
    }

    const resData = await response.json();

    // Assuming the usernames are in an array under the key `usernames`
    return { status: response.status, data: resData.usernames || [] };
  } catch (error) {
    console.error(
      "Server or network issue while fetching usernames:",
      error.message
    );
    return { status: 500, data: null };
  }
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

    const { data, uploaded_count } = await response.json();

    // Return the response data and status
    return {
      status: response.status,
      unparsed: data,
      uploadedCount: uploaded_count,
    };
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Server or network issue:", error.message);
    return { status: 500, unparsed: [], uploadedCount: 0 };
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
export const fetchSuggestedSkills = async (param = "") => {
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

/**
 * Fetches the list of onboarding candidates from the API.
 *
 * @async
 * @function
 * @param {string} url - The URL to which the request is sent.
 * @returns {Promise<Object>} An object containing the response status and an array of candidate data.
 */
export const fetchFormRecords = async (url) => {
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
 * Fetches a specific candidate's onboarding details by ID from the API.
 *
 * @async
 * @function
 * @param {string} url - The url of the API.
 * @returns {Promise<Object>} An object containing the response status and the candidate data.
 */
export const fetchFormRecordById = async (url) => {
  try {
    const response = await fetchWithToken(url, {
      method: "GET",
    });
    const resData = await response.json();

    // Return the response data and status
    return { status: response.status, data: resData.data };
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Server or network issue:", error.message);
    return { status: 500, data: null };
  }
};

/**
 * Adds the new record.
 *
 * @async
 * @function
 * @param {Object} body - The request body containing new record to be added.
 * @param {string} url - The url of the API.
 * @returns {Promise<Object>} An object containing the response status.
 */
export const addFormRecord = async (body, url) => {
  try {
    const response = await fetchWithToken(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const resData = await response.json();

    // Return status
    if (!response.ok) {
      return { status: 500, apiData: null };
    }

    return { status: response.status, apiData: resData.data };
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Server or network issue:", error.message);
    return { status: 500 };
  }
};

/**
 * Updates the existing record.
 *
 * @async
 * @function
 * @param {Object} body - The request body containing whole record with new details to be updated.
 * @param {Object} id - The id of the record to be updated.
 * @param {string} url - The url of the API.
 * @returns {Promise<Object>} An object containing the response status.
 */
export const updateFormRecord = async (body, id, url) => {
  try {
    const response = await fetchWithToken(replaceRouteParam(url, { id }), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const resData = await response.json();

    // Return status
    if (!response.ok) {
      return { status: 500, apiData: null };
    }

    return { status: response.status, apiData: resData.data };
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Server or network issue:", error.message);
    return { status: 500 };
  }
};

/**
 * Updates the status of an existing candidate.
 *
 * @async
 * @function
 * @param {string} url - The url of the API.
 * @param {Object} body - The request body containing the new status to set for the candidate.
 * @returns {Promise<Object>} An object containing the response status and API data.
 */
export const updateFormRecordStatus = async (url, body) => {
  try {
    const response = await fetchWithToken(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const resData = await response.json();

    // Return status
    return { status: response.status, response: resData };
  } catch (error) {
    // Handle network or server issues
    console.error("Server or network issue:", error.message);
    return { status: 500, response: null };
  }
};

/**
 * Makes a GET request to retrieve suggestions.
 *
 * @async
 * @function
 * @param {Object} body - The request body containing whole details get suggestion
 * @returns {Promise<{ status: number, data: Object|null }>} The status and data from the response.
 */
export const makeSuggestions = async (body) => {
  try {
    const response = await fetchWithToken(END_POINTS.SPARK.GET_SUGGESTIONS, {
      method: "POST",
      body,
    });

    if (!response.ok) {
      // Assume any error that causes this block to execute is a server issue
      return { status: response.status, data: null };
    } else {
      // Return the response data and status
      const resData = await response.json();
      return { status: response.status, data: resData };
    }
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Error fetching suggestions:", error);
    return { status: 500, data: null };
  }
};

/**
 * Makes a POST request to generate questions.
 *
 * @async
 * @function
 * @param {Object} body - The request body containing job description to generate questions.
 * @returns {Promise<{ status: number, data: Object|null }>} The status and data from the response.
 */
export const generateQuestions = async (body) => {
  try {
    const response = await fetchWithToken(END_POINTS.QUEST.GENERATE_QUESTIONS, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Assume any error that causes this block to execute is a server issue
      return { status: response.status, data: null };
    } else {
      // Return the response data and status
      const resData = await response.json();
      return { status: response.status, data: resData };
    }
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Error generating questions:", error);
    return { status: 500, data: null };
  }
};

/**
 * Makes a POST request to initiate call.
 *
 * @async
 * @function
 * @param {Object} body - The request body containing the phone number to initiate call.
 * @returns {Promise<{ status: number, data: Object|null }>} The status and data from the response.
 */
export const initiateCall = async (body) => {
  try {
    const response = await fetchWithToken(END_POINTS.QUEST.INITIATE_CALL, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Assume any error that causes this block to execute is a server issue
      return { status: response.status, data: null };
    } else {
      // Return the response data and status
      const resData = await response.json();
      return { status: response.status, data: resData.call_sid };
    }
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Error generating questions:", error);
    return { status: 500, data: null };
  }
};

/**
 * Makes a POST request to initiate call.
 *
 * @async
 * @function
 * @param {string} url - The URL to which the request is sent.
 * @returns {Promise<{ status: number, data: Object|null }>} The status and data from the response.
 */
export const getConversation = async (url) => {
  try {
    const response = await fetchWithToken(url);

    if (!response.ok) {
      // Assume any error that causes this block to execute is a server issue
      return { status: response.status, data: null, callStatus: "" };
    } else {
      // Return the response data and status
      const resData = await response.json();
      return {
        status: response.status,
        data: resData.log_data,
        callStatus: resData.status,
      };
    }
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Error fetching conversation:", error);
    return { status: 500, data: null, callStatus: "" };
  }
};

/**
 * Function to connect to the streaming API and handle progress updates.
 *
 * @param {Function} setStatus - Function to update the status state.
 * @param {Function} setMessage - Function to update the message state.
 * @param {Function} setTotalFiles - Function to update the totalFiles state.
 * @param {Function} setProcessedFiles - Function to update the processedFiles state.
 */
export const getInsightBatchProcessStatus = async (
  setStatus,
  setMessage,
  setTotalFiles,
  setProcessedFiles
) => {
  try {
    const response = await fetchWithToken(
      END_POINTS.INSIGHT.BATCH_PROCESS_STATUS,
      {
        method: "POST",
      }
    );

    if (!response.body) {
      throw new Error("ReadableStream not supported by the response.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let done = false;
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        const data = JSON.parse(chunk); // Ensure the chunked data is parsed

        const success = data?.success;
        const warning = data?.warning;
        const newMessage = data?.message;
        const processedFiles = data?.processedFiles;
        const totalFiles = data?.totalFiles;

        setMessage(newMessage);

        if (processedFiles?.toString() && totalFiles?.toString()) {
          setTotalFiles(totalFiles);
          setProcessedFiles(processedFiles);
        }

        if (!success) {
          setStatus(BATCH_PROCESS_STATUS.ERROR);
        } else {
          if (warning) {
            setStatus(BATCH_PROCESS_STATUS.PROCESSING_WARNING);
          } else {
            if (processedFiles === totalFiles)
              setStatus(BATCH_PROCESS_STATUS.PROCESSED);
            else if (!processedFiles && !totalFiles)
              setStatus(BATCH_PROCESS_STATUS.NO_FILES);
            else setStatus(BATCH_PROCESS_STATUS.PROCESSING);
          }
        }
      }
    }
  } catch (error) {
    console.error("Streaming API error:", error);
    setStatus(BATCH_PROCESS_STATUS.ERROR);
    setMessage(CONTENT.COMMON.serverError);
  }
};

/**
 * Makes a POST request to the web scraping API to fetch website overview.
 *
 * @async
 * @function fetchWebsiteOverview
 * @param {string} url - The website URL to be scraped.
 * @returns {Promise<{ status: number, data: Array|null }>} The status and data from the response.
 */
export const fetchWebsiteOverview = async (url) => {
  try {
    const response = await fetchWithToken(END_POINTS.NEXUS.WEB_SCRAP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      // Handle error response
      console.error("Failed to fetch website overview:", response.statusText);
      return { status: response.status, data: null };
    }

    // Parse and return response data
    const resData = await response.json();
    return { status: response.status, data: resData.data };
  } catch (error) {
    // Handle network or server error
    console.error("Error fetching website overview:", error.message);
    return { status: 500, data: null };
  }
};
