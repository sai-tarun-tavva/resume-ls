import { END_POINTS } from "../constants";

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
  try {
    const response = await fetch(url, {
      method: "POST",
      body,
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
 * Fetches the list of candidates from the API.
 *
 * @async
 * @function
 * @returns {Promise<Object>} An object containing the response status and an array of candidate data.
 */
export const fetchCandidates = async () => {
  try {
    const response = await fetch(END_POINTS.FETCH_CANDIDATES);
    const resData = await response.json();

    // Return the response data and status
    return { status: response.status, data: resData.results };
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Server or network issue:", error.message);
    return { status: 500, data: null };
  }
};

/**
 * Downloads the resume of a candidate by making a request with the provided candidate ID.
 *
 * @async
 * @function
 * @param {string} id - The ID of the candidate whose resume is being downloaded.
 * @returns {Promise<Object>} An object containing the response status.
 */
export const downloadResume = async (id) => {
  try {
    const { status } = await fetch(`${END_POINTS.DOWNLOAD_RESUME}${id}`);

    // Return the status
    return { status };
  } catch (error) {
    // Assume any error that causes this block to execute is a server or network issue
    console.error("Server or network issue:", error.message);
    return { status: 500 };
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
    const response = await fetch(
      END_POINTS.EDIT_CANDIDATE.replace("{{id}}", id),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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
    const response = await fetch(END_POINTS.UPLOAD_RESUME, {
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
