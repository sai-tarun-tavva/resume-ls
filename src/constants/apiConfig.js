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
  VIEW_RESUME:
    "https://httpbin.org/response-headers?Content-Disposition=inline;filename=test.pdf",
  DOWNLOAD_RESUME: `${apiUrl}home/resume/download/`,
  UPLOAD_RESUME: `${apiUrl}upload-file/`,
  BATCH_PROCESS: `${apiUrl}/dummy`,
  FETCH_SUGGESTED_SKILLS:
    "https://run.mocky.io/v3/1987e343-06ef-4993-b9f5-92cd4e106887",
};
