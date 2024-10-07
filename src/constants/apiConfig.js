const apiUrl = process.env.REACT_APP_BACKEND_URL;

export const END_POINTS = {
  FETCH_RESUME_COUNT:
    "https://run.mocky.io/v3/37769b20-8d66-465a-9928-f96d2ae4f255",
  LOGIN: `${apiUrl}login/`,
  LOGOUT: `${apiUrl}logout`,
  SIGN_UP: `${apiUrl}signup/`,
  GET_TOKEN: `${apiUrl}api/token/`,
  REFRESH_TOKEN: `${apiUrl}api/token/refresh/`,
  FETCH_CANDIDATES: `${apiUrl}resume_list/`,
  EDIT_CANDIDATE: `${apiUrl}resume/{{id}}/edit/`,
  DOWNLOAD_RESUME: `${apiUrl}home/resume/download/`,
  UPLOAD_RESUME: `${apiUrl}upload-file/`,
  BATCH_PROCESS: `${apiUrl}/dummy`,
};
