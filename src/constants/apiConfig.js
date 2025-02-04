const BASE_URL =
  process.env.REACT_APP_ENV === "development"
    ? process.env.REACT_APP_BACKEND_URL // Hardcoded URL for development
    : `http://${window.location.hostname}:${process.env.REACT_APP_BACKEND_PORT}/`; // Use front-end hostname and backend port for deployed environments

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
   * Handles user authentication, login, logout, token management and fetching number of records in each tool.
   */
  WELCOME: {
    FETCH_INSIGHT_COUNT: `${BASE_URL}resume_count/`,
    FETCH_ONBOARD_COUNT: `${BASE_URL}candidates_count/`,
    FETCH_QUEST_COUNT: `${BASE_URL}i_count/`,
    FETCH_SALES_COUNT: `${BASE_URL}sales_count/`,
    FETCH_RECRUIT_COUNT: `${BASE_URL}recruit_count/`,
    LOGIN: `${BASE_URL}login/`,
    LOGOUT: `${BASE_URL}logout/`,
    SIGN_UP: `${BASE_URL}signup/`,
    REFRESH_TOKEN: `${BASE_URL}api/token/refresh/`,
    FETCH_USERNAMES: `${BASE_URL}usernames/`,
  },

  /**
   * INSIGHT Endpoints
   *
   * Manages resume-related operations like fetching candidates, editing candidates, viewing resumes,
   * downloading, uploading, and batch processing resumes, and handling skill suggestions.
   */
  INSIGHT: {
    FETCH_CANDIDATES: {
      url: `${BASE_URL}resume_list/`,
      params: { limit: "limit", page: "page", query: "query" },
    },
    EDIT_CANDIDATE: `${BASE_URL}resume/{{id}}/edit/`,
    VIEW_RESUME: `${BASE_URL}view-file/`,
    DOWNLOAD_RESUME: `${BASE_URL}home/resume/download/`,
    UPLOAD_RESUME: `${BASE_URL}upload-file/`,
    BATCH_PROCESS: `${BASE_URL}/dummy`, // Pending implementation
    // BATCH_PROCESS_STATUS: `${BASE_URL}upload-folder/`,
    BATCH_PROCESS_STATUS: `https://run.mocky.io/v3/6b925522-43f2-4072-b45a-4d2f95efd812`,
    FETCH_SUGGESTED_SKILLS: `${BASE_URL}search-skills/?query=`,
    CREATE_NEW_SKILL: `${BASE_URL}add-skills`,
  },

  /**
   * ONBOARD Endpoints
   *
   * Manages onboarding-related operations for candidates, including fetching, adding,
   * and updating candidate records.
   */
  ONBOARD: {
    FETCH_CANDIDATES: {
      url: `${BASE_URL}candidates_filter/`,
      params: {
        limit: "limit",
        page: "page",
        query: "query",
        statuses: "status",
      },
    },
    FETCH_CANDIDATE: `${BASE_URL}candidates_get/:id/`,
    ADD_CANDIDATE: `${BASE_URL}candidates/`,
    UPDATE_CANDIDATE: `${BASE_URL}candidates/:id/`,
    UPDATE_STATUS: `${BASE_URL}update_status/:id/`,
  },

  /**
   * SPARK Endpoints
   *
   * Handles operations related to generating suggestions, such as fetching ATS suggestions for Spark functionality.
   */
  SPARK: {
    GET_SUGGESTIONS: `${BASE_URL}ats/`,
  },

  /**
   * QUEST Endpoints
   *
   * Handles operations related to generating questions, initializing call and fetching conversation for Quest functionality.
   */
  QUEST: {
    GENERATE_QUESTIONS: `${BASE_URL}set_questions/`,
    INITIATE_CALL: `${BASE_URL}initiate_call/`,
    GET_CONVERSATION: `${BASE_URL}get_log_data/:sessionID/`,
  },

  /**
   * FORGE Endpoints
   *
   * Manages sales and recruiting related operations for candidates, including fetching, adding,
   * and updating submission records.
   */
  FORGE: {
    SALES: {
      FETCH_RECORDS: {
        url: `${BASE_URL}sales_filter/`,
        params: {
          limit: "limit",
          page: "page",
          query: "query",
          statuses: "status",
        },
      },
      FETCH_RECORD: `${BASE_URL}sales_get_id/:id/`,
      ADD_RECORD: `${BASE_URL}sales_records/`,
      UPDATE_RECORD: `${BASE_URL}update_sales/:id/`,
      UPDATE_RECORD_STATUS: `${BASE_URL}update_status_sales/:id/`,
    },
    RECRUIT: {
      FETCH_RECORDS: {
        url: `${BASE_URL}recruits_filter/`,
        params: {
          limit: "limit",
          page: "page",
          query: "query",
          statuses: "status",
        },
      },
      FETCH_RECORD: `${BASE_URL}recruit_get_id/:id/`,
      ADD_RECORD: `${BASE_URL}recruit_records/`,
      UPDATE_RECORD: `${BASE_URL}update_recruit/:id/`,
      UPDATE_RECORD_STATUS: `${BASE_URL}update_status_recruit/:id/`,
    },
  },

  /**
   * NEXUS Endpoints
   *
   * Handles operations related to web scraping, such as fetching website overviews for Nexus functionality.
   */
  NEXUS: {
    WEB_SCRAP: `${BASE_URL}web_scrap/`,
  },
};
