export const CONTENT = {
  COMMON: {
    serverError: "Server error, please try again later.",
    noCandidateRecord: "No candidates found.",
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
      name: {
        empty: "Name is required.",
      },
      phone: {
        empty: "Phone number is required.",
        invalid: "Phone number must contain exactly 10 digits.",
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
      date: {
        empty: "Date is required.",
      },
      status: {
        empty: "Status is required.",
      },
      firstName: {
        empty: "First name is required.",
      },
      lastName: {
        empty: "Last name is required.",
      },
      dob: {
        empty: "Date of birth is required.",
      },
      gender: {
        empty: "Gender is required.",
      },
      passportNumber: {
        empty: "Passport number is required.",
        invalid: "Please enter a valid passport number.",
      },
      visaStatus: {
        empty: "Visa status is required.",
      },
      eadNumber: {
        empty: "EAD card number is required.",
        invalid: "Please enter a valid EAD card number.",
      },
      ssn: {
        empty: "SSN is required.",
        invalid: "Please enter a valid SSN.",
      },
      licenseNumber: {
        empty: "License number is required.",
        invalid: "Please enter a valid license number.",
      },
      stateIDNumber: {
        empty: "State ID number is required.",
        invalid: "Please enter a valid state ID.",
      },
      skypeIDNumber: {
        invalid: "Please enter a valid Skype ID.",
      },
      address1: {
        empty: "Address Line 1 is required.",
      },
      country: {
        empty: "Country is required.",
      },
      zipcode: {
        empty: "Zipcode is required.",
        invalid: "Please enter a valid Zipcode.",
      },
      howSoon: {
        empty: "Please select how soon you are willing to relocate.",
      },
      stayPreference: {
        empty: "Preference of stay is required.",
      },
      sevisID: {
        empty: "SEVIS ID is required.",
        invalid:
          "SEVIS ID must start with 'N' and be followed by exactly 10 digits.",
      },
      dsoName: {
        empty: "DSO Name is required.",
      },
      dsoEmail: {
        empty: "DSO Email is required.",
        invalid: "Please enter a valid DSO email address.",
      },
      dsoPhone: {
        empty: "DSO Phone number is required.",
        invalid: "Please enter a valid DSO phone number.",
      },
      universityName: {
        empty: "University Name is required.",
      },
      passedMonthAndYear: {
        empty: "Passed month and year are required.",
      },
      stream: {
        empty: "Stream is required.",
      },
      certificate: {
        empty: "Certificate is required.",
      },
      experienceInYears: {
        empty: "Years is required.",
        invalid: "Please enter a valid year.",
      },
      experienceInMonths: {
        empty: "Months is required.",
      },
      technology: {
        empty: "Technology is required.",
      },
      employerName: {
        empty: "Company name is required.",
      },
      employerPhone: {
        empty: "Company phone is required.",
        invalid: "Company phone is invalid.",
      },
      employerEmail: {
        empty: "Company email is required.",
        invalid: "Company email is invalid.",
      },
      referenceName: {
        empty: "Reference name is required.",
      },
      referencePhone: {
        empty: "Reference phone is required.",
        invalid: "Reference phone is invalid.",
      },
      referenceEmail: {
        empty: "Reference email is required.",
        invalid: "Reference email is invalid.",
      },
      referenceDesignation: {
        empty: "Reference designation is required.",
      },
      referenceCompany: {
        empty: "Reference company is required.",
      },
      offerLetterStatus: {
        empty: "Offer letter status is required.",
      },
      marketingName: {
        empty: "Marketing name is required.",
      },
      offerLetterDesignation: {
        empty: "Designation is required.",
      },
      startDate: {
        empty: "Start date is required.",
      },
      endDate: {
        empty: "End date is required.",
      },
      rolesAndResponsibilities: {
        empty: "Roles and responsibilities are required.",
        minLength:
          "Roles and responsibilities should be at least 50 characters.",
        maxLength: "Roles and responsibilities cannot exceed 1000 characters.",
      },
      usEntry: {
        empty: "US entry month and year is required.",
      },
    },
    pageNotFound: {
      title: "404",
      message:
        "It seems the resume you were looking for got lost in cyberspace! 🚀",
      suggestionStart: "Head back to the ",
      suggestionEnd: " to find the perfect candidate!",
      suggestedPageName: "Home page",
    },
  },
  WELCOME: {
    statusMessages: {
      login: "Incorrect username or password.",
      signUp: "Username is already taken.",
    },
    welcomePanel: {
      logoAlt: "Logisoft logo",
      heading: "Empowering Resumes, Elevating Careers",
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
  INSIGHT: {
    statusMessages: {
      form: {
        success: "Successfully updated candidate details!",
        failure: "Failed to update candidate information. Please try again.",
      },
      skill: {
        empty: "Cannot add empty skill.",
        existing: "Skill already exists.",
        added: " added to skills.",
      },
      upload: {
        maxFiles:
          "Only the first {{MAX_FILES}} files, each under {{MAX_FILE_SIZE}}MB will be included.",
      },
    },
    upload: {
      helper: {
        message:
          "Uploading more than 30 files? For a smoother experience, consider using our batch process. Click the link below!",
        urlText: "Head to batch process",
      },
      dragDrop: {
        heading: "Drag and drop or click here",
        paragraphFile: "to choose your files",
        info: "`Only the first {{MAX_FILES}} files in TXT, DOC, DOCX, and PDF formats, each under {{MAX_FILE_SIZE}}MB will be accepted.",
      },
      button: "Upload file",
    },
    operations: {
      logoSuffix: "R",
      logo: "Insight",
      search: {
        placeholder: "Search...",
        title: "Search",
      },
    },
    fileViewer: {
      header: "Viewer is unsupported for .doc, .docx, .txt files",
      paragraph: "Please download the file to view its contents",
      button: "Download Resume",
    },
    candidate: {
      defaultValues: {
        name: "Name",
        phoneNumber: "Phone Number",
        email: "Email",
        location: "City",
        region: "State",
        experience: "{{EXP}} Year",
      },
    },
    candidateForm: {
      placeholders: {
        name: "Name",
        phoneNumber: "Phone number",
        email: "Email",
        skill: "Skill",
        linkedInUrl: "https://www.linkedin.com/in/your-profile",
        city: "City",
        state: "State",
        experience: "Experience in years",
      },
      suggestions: {
        helper: "Choose from suggestions below",
        button: {
          create: {
            default: "Couldn't find? create a skill",
          },
        },
      },
      button: {
        close: "Close",
        save: {
          default: "Save",
          loading: "Saving...",
        },
      },
    },
  },
  ONBOARD: {
    operations: {
      logoSuffix: "R",
      logo: "Onboard",
      search: {
        placeholder: "Search...",
      },
    },
  },
};
