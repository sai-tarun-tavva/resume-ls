import { END_POINTS, ROUTES } from "../constants";

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
      window.location.href = `/${ROUTES.AUTH}`; // Adjust the path as necessary
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
      window.location.href = `/${ROUTES.AUTH}`; // Adjust the path as necessary
      return; // Prevent further execution
    }
  }

  return response;
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return "failure";

  try {
    const response = await fetch(END_POINTS.REFRESH_TOKEN, {
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

export const handleLogout = async () => {
  try {
    // Get the refresh token from localStorage
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      // Make an API request to your backend to invalidate/blacklist the refresh token
      const response = await fetch(END_POINTS.LOGOUT, {
        method: "POST",
        body: JSON.stringify({
          token: refreshToken, // Pass the token to the backend
        }),
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
 * Fetches the list of candidates from the API.
 *
 * @async
 * @function
 * @returns {Promise<Object>} An object containing the response status and an array of candidate data.
 */
export const fetchCandidates = async () => {
  try {
    const response = await fetchWithToken(END_POINTS.FETCH_CANDIDATES, {
      method: "GET",
    });
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
      END_POINTS.EDIT_CANDIDATE.replace("{{id}}", id),
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
    const response = await fetchWithToken(END_POINTS.UPLOAD_RESUME, {
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
