const INSIGHT_IP_PORT = "http://10.0.12.114:8000/";
const ONBOARD_IP_PORT = "http://10.0.12.114:8000/";

export const END_POINTS = {
  WELCOME: {
    FETCH_RESUME_COUNT: `${INSIGHT_IP_PORT}resume_count/`,
    LOGIN: `${INSIGHT_IP_PORT}login/`,
    LOGOUT: `${INSIGHT_IP_PORT}logout/`,
    SIGN_UP: `${INSIGHT_IP_PORT}signup/`,
    REFRESH_TOKEN: `${INSIGHT_IP_PORT}api/token/refresh/`,
  },
  INSIGHT: {
    FETCH_CANDIDATES: {
      url: `${INSIGHT_IP_PORT}resume_list/`,
      params: { limit: "limit", page: "page", query: "query" },
    },
    EDIT_CANDIDATE: `${INSIGHT_IP_PORT}resume/{{id}}/edit/`,
    VIEW_RESUME: `${INSIGHT_IP_PORT}view-file/`,
    DOWNLOAD_RESUME: `${INSIGHT_IP_PORT}home/resume/download/`,
    UPLOAD_RESUME: `${INSIGHT_IP_PORT}upload-file/`,
    BATCH_PROCESS: `${INSIGHT_IP_PORT}/dummy`, // pending
    FETCH_SUGGESTED_SKILLS: `${INSIGHT_IP_PORT}search-skills/?query=`,
    CREATE_NEW_SKILL: `${INSIGHT_IP_PORT}add-skills`,
  },
  ONBOARD: {
    FETCH_CANDIDATES: {
      url: `${ONBOARD_IP_PORT}candidates_get/`,
      params: { limit: "limit", page: "page", query: "query" },
    },
    ADD_CANDIDATE: `${ONBOARD_IP_PORT}candidates/`,
    UPDATE_CANDIDATE: `${ONBOARD_IP_PORT}candidates/:id/`,
  },
  SPARK: {
    GET_SUGGESTIONS:
      "https://run.mocky.io/v3/89654fad-620b-4474-a072-a6dd87a34c86",
  },
};
