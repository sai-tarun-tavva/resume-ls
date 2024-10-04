// export const END_POINTS = {
//   FETCH_RESUME_COUNT:
//     "https://run.mocky.io/v3/37769b20-8d66-465a-9928-f96d2ae4f255",
//   LOGIN: "",
//   SIGN_UP: "",
//   FETCH_CANDIDATES:
//     "https://run.mocky.io/v3/27f98f3b-a43d-4e98-a2c5-47bed7d6752f",
//   EDIT_CANDIDATE:
//     "https://run.mocky.io/v3/3465b7e8-875a-423e-b2a2-da2ffe5e0265",
//   DOWNLOAD_RESUME:
//     "https://something.free.beeceptor.com/home/resume/download/6",
//   UPLOAD_RESUME: "https://something.free.beeceptor.com/home/upload",
//   BATCH_PROCESS: "https://www.linkedin.com/in/sai-tarun-tavva",
// };

export const END_POINTS = {
  FETCH_RESUME_COUNT:
    "https://run.mocky.io/v3/37769b20-8d66-465a-9928-f96d2ae4f255",
  LOGIN: "http://10.0.12.114:8000/login/",
  SIGN_UP: "http://10.0.12.114:8000/signup/",
  GET_TOKEN: "http://10.0.12.114:8000/api/token/",
  REFRESH_TOKEN: "http://10.0.12.114:8000/api/token/refresh/",
  FETCH_CANDIDATES: "http://10.0.12.114:8000/resume_list/",
  EDIT_CANDIDATE: "http://10.0.12.114:8000/resume/{{id}}/edit/",
  DOWNLOAD_RESUME: "http://10.0.12.114:8000/home/resume/download/",
  UPLOAD_RESUME: "http://10.0.12.114:8000/upload-file/",
  BATCH_PROCESS: "https://www.linkedin.com/in/sai-tarun-tavva",
};
