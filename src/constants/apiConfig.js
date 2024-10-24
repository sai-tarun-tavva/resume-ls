const INSIGHT_IP_PORT = "http://10.0.12.114:8000/";
// const ONBOARD_IP_PORT = 'http://10.0.12.114:8200/'; // pending

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
    FETCH_SUGGESTED_SKILLS: `${INSIGHT_IP_PORT}search-skills?query=`,
    CREATE_NEW_SKILL: `${INSIGHT_IP_PORT}add-skills`,
  },
  ONBOARD: {
    FETCH_CANDIDATES: {
      url: "https://run.mocky.io/v3/f0146370-fffe-490c-90d6-b40595eaf0ee",
    },
  },
  SPARK: {},
};
