export const CONTENT = {
  serverError: "Server error. Please try again later.",
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
      errors: {
        username: {
          empty: "Username is required.",
          invalid:
            "Username must be 3-20 characters and can only include letters or hyphens.",
        },
        password: {
          empty: "Password is required.",
          invalid: "Include 8+ chars, upper, lower, number, symbol.",
        },
        email: {
          empty: "Email is required.",
          invalid: "Please enter a valid email address.",
        },
        server: {
          login: "Incorrect username or password.",
          signUp: "Username is already taken.",
        },
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
        maxFiles:
          "Only first {{MAX_FILES}} files are being uploaded. Extra files were excluded.",
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
        name: "Name",
        phoneNumber: "Phone Number",
        email: "Email",
        location: "City",
        region: "State",
        experience: "{{EXP}} Years",
      },
      noRecord: "No candidates found.",
    },
    candidateForm: {
      placeholders: {
        name: "Name",
        phoneNumber: "Phone number",
        email: "Email",
        skill: "Skill",
        linkedInUrl: "linkedin.com/in/your-profile",
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
        name: {
          empty: "Name is required.",
        },
        phone: {
          empty: "Phone number is required.",
          invalid: "Phone number must contain exactly 10 digits.",
        },
        email: {
          empty: "Email is required.",
          invalid: "Please enter a valid email address.",
        },
        linkedInUrl: {
          empty: "LinkedIn URL is required.",
          invalid: "Please enter a valid LinkedIn profile URL.",
        },
        city: {
          empty: "City is required.",
        },
        state: {
          empty: "State is required.",
        },
        experience: {
          empty: "Experience is required.",
          invalid: "Experience must be between 0 and 100.",
        },
        skill: {
          empty: "Cannot add empty skill.",
          existing: "Skill already exists.",
        },
        formEditRequest: {
          success: "Successfully updated candidate details!",
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
