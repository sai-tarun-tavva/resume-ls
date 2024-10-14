const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const END_POINTS = {
  FETCH_RESUME_COUNT: `${apiUrl}resume_count/`,
  LOGIN: `${apiUrl}login/`,
  LOGOUT: `${apiUrl}logout/`,
  SIGN_UP: `${apiUrl}signup/`,
  GET_TOKEN: `${apiUrl}api/token/`,
  REFRESH_TOKEN: `${apiUrl}api/token/refresh/`,
  FETCH_CANDIDATES: `${apiUrl}resume_list/`,
  EDIT_CANDIDATE: `${apiUrl}resume/{{id}}/edit/`,
  VIEW_RESUME: `${apiUrl}view-file/`,
  DOWNLOAD_RESUME: `${apiUrl}home/resume/download/`,
  UPLOAD_RESUME: `${apiUrl}upload-file/`,
  BATCH_PROCESS: `${apiUrl}/dummy`,
  FETCH_SUGGESTED_SKILLS: `${apiUrl}search-skills?query=`,
  CREATE_NEW_SKILL: `${apiUrl}add-skills`,
};
