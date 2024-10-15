const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const END_POINTS = {
  WELCOME: {
    FETCH_RESUME_COUNT: `${apiUrl}resume_count/`,
    LOGIN: `${apiUrl}login/`,
    LOGOUT: `${apiUrl}logout/`,
    SIGN_UP: `${apiUrl}signup/`,
    REFRESH_TOKEN: `${apiUrl}api/token/refresh/`,
  },
  INSIGHT: {
    FETCH_CANDIDATES: {
      url: `${apiUrl}resume_list/`,
      params: { limit: "limit", page: "page", query: "query" },
    },
    EDIT_CANDIDATE: `${apiUrl}resume/{{id}}/edit/`,
    VIEW_RESUME: `${apiUrl}view-file/`,
    DOWNLOAD_RESUME: `${apiUrl}home/resume/download/`,
    UPLOAD_RESUME: `${apiUrl}upload-file/`,
    BATCH_PROCESS: `${apiUrl}/dummy`, // pending
    FETCH_SUGGESTED_SKILLS: `${apiUrl}search-skills?query=`,
    CREATE_NEW_SKILL: `${apiUrl}add-skills`,
  },
  ONBOARD: {},
  SPARK: {},
};
