export const content = {
  authPage: {
    welcomePanel: {
      heading: "Parse your resume",
      paragraph: "Resumes parsed",
    },
    authPanel: {
      placeholders: {
        username: "username",
        password: "password",
        email: "email",
      },
      buttons: {
        login: {
          default: "Login",
          loading: "Logging In...",
        },
        signUp: {
          default: "Sign Up",
          loading: "Signing Up...",
        },
      },
      advisor: {
        login: "New here? Create an Account!",
        signUp: "Have an account? Login!",
      },
    },
  },
  candidateHub: {
    upload: {
      helper: {
        message:
          "Uploading more than 30 files? For a smoother experience, consider using our batch process. Click the link below!",
        urlText: "Head to batch process",
      },
      dragDrop: {
        heading: "Drag and drop or click here",
        paragraphFile: "to choose your files",
        paragraphFolder: "to choose your folder",
        info: "Only the first 30 files in TXT, DOC, DOCX, and PDF formats will be accepted.",
      },
      button: "Upload file",
      errors: {
        formUploadRequest: {
          network: "An error occurred during the upload.",
        },
      },
    },
    operations: {
      headerParagraph: "Resume Parser",
      search: {
        placeholder: "Search...",
        title: "Search",
      },
    },
    candidate: {
      defaultValues: {
        phoneNumber: "Mobile Number",
        email: "Email",
        location: "City",
        region: "State",
        experience: "{{exp}} Years",
      },
      noRecord: "No candidates found.",
    },
    candidateForm: {
      placeholders: {
        name: "Name",
        phoneNumber: "Mobile number",
        email: "Email",
        skill: "Skill",
        linkedInUrl: "https://www.linkedin.com/in/your-profile",
        city: "City",
        state: "State",
        experience: "Experience in years",
      },
      button: {
        close: "Close",
        save: {
          default: "Save",
          loading: "Saving...",
        },
      },
      errors: {
        skill: {
          empty: "Cannot add empty skill.",
          existing: "Skill already exists.",
        },
        formEditRequest: {
          success: "Candidate information successfully updated!",
          failure: "Failed to update candidate information. Please try again.",
          network: "Network error. Please check your connection.",
        },
      },
    },
  },
  logoAlt: "Logisoft logo",
  pageNotFound: {
    title: "404",
    message:
      "It seems the resume you were looking for got lost in cyberspace! 🚀",
    suggestionStart: "Head back to the ",
    suggestionEnd: " to find the perfect candidate!",
    suggestedPageName: "Home page",
  },
};
