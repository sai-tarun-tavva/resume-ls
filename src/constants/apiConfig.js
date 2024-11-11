const WELCOME_HOST_PORT = "http://10.0.12.114:8000/";
const INSIGHT_HOST_PORT = "http://10.0.12.114:8000/";
const ONBOARD_HOST_PORT = "http://10.0.12.114:8000/";
const SPARK_HOST_PORT = "http://10.0.12.114:8000/";

/**
 * API Endpoints Configuration
 *
 * Provides host URLs and endpoint paths for various application features,
 * including user management, candidate management, resume handling, and Spark-related suggestions.
 */
export const END_POINTS = {
  /**
   * WELCOME Endpoints
   *
   * Handles user authentication, login, logout, and token management.
   */
  WELCOME: {
    FETCH_INSIGHT_COUNT: `${INSIGHT_HOST_PORT}resume_count/`,
    FETCH_ONBOARD_COUNT: `${ONBOARD_HOST_PORT}candidates_count/`,
    LOGIN: `${WELCOME_HOST_PORT}login/`,
    LOGOUT: `${WELCOME_HOST_PORT}logout/`,
    SIGN_UP: `${WELCOME_HOST_PORT}signup/`,
    REFRESH_TOKEN: `${WELCOME_HOST_PORT}api/token/refresh/`,
  },

  /**
   * INSIGHT Endpoints
   *
   * Manages resume-related operations like fetching candidates, editing candidates, viewing resumes,
   * downloading, uploading, and batch processing resumes, and handling skill suggestions.
   */
  INSIGHT: {
    FETCH_CANDIDATES: {
      url: `${INSIGHT_HOST_PORT}resume_list/`,
      params: { limit: "limit", page: "page", query: "query" },
    },
    EDIT_CANDIDATE: `${INSIGHT_HOST_PORT}resume/{{id}}/edit/`,
    VIEW_RESUME: `${INSIGHT_HOST_PORT}view-file/`,
    DOWNLOAD_RESUME: `${INSIGHT_HOST_PORT}home/resume/download/`,
    UPLOAD_RESUME: `${INSIGHT_HOST_PORT}upload-file/`,
    BATCH_PROCESS: `${INSIGHT_HOST_PORT}/dummy`, // Pending implementation
    FETCH_SUGGESTED_SKILLS: `${INSIGHT_HOST_PORT}search-skills/?query=`,
    CREATE_NEW_SKILL: `${INSIGHT_HOST_PORT}add-skills`,
  },

  /**
   * ONBOARD Endpoints
   *
   * Manages onboarding-related operations for candidates, including fetching, adding,
   * and updating candidate records.
   */
  ONBOARD: {
    FETCH_CANDIDATES: {
      url: `${ONBOARD_HOST_PORT}candidates_filter/`,
      params: { limit: "limit", page: "page", query: "query" },
    },
    FETCH_CANDIDATE: `${ONBOARD_HOST_PORT}candidates_get/:id/`,
    ADD_CANDIDATE: `${ONBOARD_HOST_PORT}candidates/`,
    UPDATE_CANDIDATE: `${ONBOARD_HOST_PORT}candidates/:id/`,
  },

  /**
   * SPARK Endpoints
   *
   * Handles operations related to generating suggestions, such as fetching ATS suggestions for Spark functionality.
   */
  SPARK: {
    GET_SUGGESTIONS: `${SPARK_HOST_PORT}ats/`,
  },
};
