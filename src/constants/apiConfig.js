const WELCOME_HOST_PORT = "http://10.0.12.114:8000/";
const INSIGHT_HOST_PORT = "http://10.0.12.114:8000/";
const ONBOARD_HOST_PORT = "http://10.0.12.114:8000/";
const SPARK_HOST_PORT = "http://10.0.12.114:8000/";
// const QUEST_HOST_PORT = "http://10.0.12.114:8000";

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
    // FETCH_QUEST_COUNT: `${QUEST_HOST_PORT}candidates_count/`,
    FETCH_QUEST_COUNT:
      "https://run.mocky.io/v3/56f779ad-3d23-43f4-a25c-98c63fece745",
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
      params: {
        limit: "limit",
        page: "page",
        query: "query",
        statuses: "status",
      },
    },
    FETCH_CANDIDATE: `${ONBOARD_HOST_PORT}candidates_get/:id/`,
    ADD_CANDIDATE: `${ONBOARD_HOST_PORT}candidates/`,
    UPDATE_CANDIDATE: `${ONBOARD_HOST_PORT}candidates/:id/`,
    UPDATE_STATUS: `${ONBOARD_HOST_PORT}update_status/:id/`,
  },

  /**
   * SPARK Endpoints
   *
   * Handles operations related to generating suggestions, such as fetching ATS suggestions for Spark functionality.
   */
  SPARK: {
    GET_SUGGESTIONS: `${SPARK_HOST_PORT}ats/`,
  },

  /**
   * QUEST Endpoints
   *
   * Handles operations related to generating questions, initializing call and fetching conversation for Quest functionality.
   */
  QUEST: {
    // GENERATE_QUESTIONS: `${QUEST_HOST_PORT}set_questions/`,
    GENERATE_QUESTIONS:
      "https://run.mocky.io/v3/f8b35910-3055-4a4c-96bf-1ea5824ca235",
    // INITIATE_CALL: `${QUEST_HOST_PORT}initiate_call/`,
    INITIATE_CALL:
      "https://run.mocky.io/v3/c26344c2-4d3f-449b-a629-800cbd0f6bf5",
    // GET_CONVERSATION: `${QUEST_HOST_PORT}get-log-data/:sessionId/`,
    GET_CONVERSATION:
      // "https://run.mocky.io/v3/9630feca-04f3-4f99-872c-1112cc201f99", // without status
      // "https://run.mocky.io/v3/cb815b52-153a-4d3e-a8ae-7f11e6b774c0", // with status
      "https://run.mocky.io/v3/afc2ebd6-1175-4278-b6b3-4417524690a2", // status completed
    // "https://run.mocky.io/v3/b38adeff-a655-454d-9308-4816d40d5667", // status canceled
  },
};
