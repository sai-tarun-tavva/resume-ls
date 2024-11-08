const WELCOME_HOST_PORT = "http://10.0.12.114:8000/";
const INSIGHT_HOST_PORT = "http://10.0.12.114:8000/";
const ONBOARD_HOST_PORT = "http://10.0.12.114:8000/";
const SPARK_HOST_PORT = "http://10.0.12.114:8100/";

export const END_POINTS = {
  WELCOME: {
    FETCH_RESUME_COUNT: `${INSIGHT_HOST_PORT}resume_count/`,
    LOGIN: `${WELCOME_HOST_PORT}login/`,
    LOGOUT: `${WELCOME_HOST_PORT}logout/`,
    SIGN_UP: `${WELCOME_HOST_PORT}signup/`,
    REFRESH_TOKEN: `${WELCOME_HOST_PORT}api/token/refresh/`,
  },
  INSIGHT: {
    FETCH_CANDIDATES: {
      url: `${INSIGHT_HOST_PORT}resume_list/`,
      params: { limit: "limit", page: "page", query: "query" },
    },
    EDIT_CANDIDATE: `${INSIGHT_HOST_PORT}resume/{{id}}/edit/`,
    VIEW_RESUME: `${INSIGHT_HOST_PORT}view-file/`,
    DOWNLOAD_RESUME: `${INSIGHT_HOST_PORT}home/resume/download/`,
    UPLOAD_RESUME: `${INSIGHT_HOST_PORT}upload-file/`,
    BATCH_PROCESS: `${INSIGHT_HOST_PORT}/dummy`, // pending
    FETCH_SUGGESTED_SKILLS: `${INSIGHT_HOST_PORT}search-skills/?query=`,
    CREATE_NEW_SKILL: `${INSIGHT_HOST_PORT}add-skills`,
  },
  ONBOARD: {
    FETCH_CANDIDATES: {
      url: `${ONBOARD_HOST_PORT}candidates_filter/`,
      params: { limit: "limit", page: "page", query: "query" },
    },
    ADD_CANDIDATE: `${ONBOARD_HOST_PORT}candidates/`,
    UPDATE_CANDIDATE: `${ONBOARD_HOST_PORT}candidates/:id/`,
  },
  SPARK: {
    GET_SUGGESTIONS: `${SPARK_HOST_PORT}new_upload/`,
  },
};
