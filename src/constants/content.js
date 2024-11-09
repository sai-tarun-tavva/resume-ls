import { OPERATION_UI_KEYS } from "../micro-frontends/Spark/constants";

const {
  REVIEW,
  ABOUT,
  PERCENTAGE,
  IMPROVE,
  KEYWORDS,
  QUESTIONS,
  EXPERIENCE,
  SKILLS,
  HASHTAGS,
} = OPERATION_UI_KEYS;

/**
 * Content Constants
 *
 * This object centralizes all content strings, error messages, labels, placeholders, and button text
 * used across the application.
 */
export const CONTENT = {
  /**
   * Common messages and error content used throughout the application.
   */
  COMMON: {
    serverError: "Server error, please try again later.",
    noCandidateRecord: "No candidates found.",
    searchTooltipHeader: "Searches by:",
    mainNavigation: {
      onboard: "Onboard",
      insight: "Insight",
      spark: "Spark",
    },
    errors: {
      username: {
        empty: "Username is required.",
        invalid:
          "Username must be 3-20 characters and can only include letters, digits, hyphens or backslashes.",
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
      jobDescription: {
        empty: "Job description is required.",
      },
      uploadResume: {
        empty: "Resume is required.",
      },
      chooseService: {
        empty: "Please choose a service.",
      },
      actions: {
        empty: "Please select at least one action.",
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

  /**
   * Welcome screen messages and labels.
   */
  WELCOME: {
    statusMessages: {
      login: "Incorrect username or password.",
      signUp: "Username is already taken.",
    },
    welcomePanel: {
      logoAlt: "Logisoft logo",
      heading: "Empowering Resumes, Elevating Careers",
      insightParagraph: "Resumes parsed",
      onboardParagraph: "Candidates onboarded",
      sparkParagraph: "Changes suggested",
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

  /**
   * INSIGHT Module content for candidate management.
   */
  INSIGHT: {
    statusMessages: {
      form: {
        success: "Successfully updated candidate details!",
        failure: "Failed to update candidate information. Please try again.",
      },
      skill: {
        empty: "Cannot add an empty skill.",
        existing: "Skill already exists.",
        added: " added to skills.",
        fetchFail:
          "Failed to fetch skill set, auto skill suggestions are unavailable!",
      },
      upload: {
        maxFiles:
          "Only the first {{MAX_FILES}} files, each under {{MAX_FILE_SIZE}}MB will be included.",
      },
    },
    upload: {
      helper: {
        message:
          "For over 30 files, consider using batch processing. Click below!",
        urlText: "Go to batch process",
      },
      dragDrop: {
        heading: "Drag and drop or click here",
        paragraphFile: "to choose your files",
        info: "`Only the first {{MAX_FILES}} files in TXT, DOC, DOCX, and PDF formats, each under {{MAX_FILE_SIZE}}MB will be accepted.",
      },
      status: {
        title: "Upload Status",
        body: " files uploaded successfully.",
        unparsed:
          "Some files couldn’t be uploaded. Try re-uploading these files:",
      },

      button: "Upload file",
    },
    operations: {
      logoSuffix: "R",
      logo: "Insight",
      search: {
        placeholder: "Search...",
        searchFields: [
          "Name",
          "Email",
          "Mobile",
          "City",
          "State",
          "Experience",
          "Skills",
        ],
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
      noSkills: "No skills found",
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
          create: { default: "Couldn't find? Create a skill" },
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

  /**
   * ONBOARD Module content for onboarding candidate management.
   */
  ONBOARD: {
    operations: {
      logoSuffix: "R",
      logo: "Onboard",
      search: {
        placeholder: "Search...",
        searchFields: ["Status", "First name", "Last name", "Email", "Mobile"],
      },
    },
    candidates: {
      columnHeaders: {
        status: "Status",
        onboardingDate: "Onboarding Date",
        lastUpdated: "Last Updated (EST)",
        position: "Position",
        experience: "Experience",
        companyName: "Company Name",
        technology: "Technology",
        firstName: "First Name",
        lastName: "Last Name",
        marketingName: "Marketing Name",
        location: "Location",
        relocation: "Relocation",
        phone: "Mobile Number",
        email: "Email Address",
        dob: "Date of Birth",
        universityName: "University Name",
        offerStatus: "Offer Letter Status",
        referenceName: "Reference Name",
        guestHouseMember: "Guest House Member",
        remarks: "Remarks",
        notes: "Notes",
      },
      noCandidates: "No candidates available",
    },
    candidateForm: {
      address: {
        address1: "Address Line 1",
        address2: "Address Line 2",
        city: "City",
        state: "State",
        country: "Country",
        zipcode: "Zipcode",
      },
      sections: {
        onboarding: {
          date: "Onboarding Date",
          status: "Onboarding Status",
        },
        personal: {
          firstName: "First Name",
          lastName: "Last Name",
          emailId: "Email ID",
          phone: "Mobile Number",
          secondaryPhone: "Secondary or WhatsApp Number",
          gender: "Gender",
          dob: "Date of Birth",
          maritalStatus: "Marital Status",
          passportNumber: "Passport Number",
          ssn: "Social Security Number",
          visaStatus: "Visa Status",
          eadNumber: "EAD Number",
          photoIDType: "Photo ID Type",
          licenseNumber: "License number",
          stateIDNumber: "State ID number",
          skypeID: "Skype ID",
          referenceName: "Reference Name",
        },
        location: {
          usaHeading: "Address in USA",
          haveIndian: {
            label:
              "Have any address in India (if applicable) or another country?",
            helper: "(Considered no by default)",
          },
          indiaHeading: "Address in India",
        },
        relocation: {
          interested: {
            label: "Interested in Relocation?",
            helper: "(Considered yes by default)",
          },
          howSoon: "How soon are you willing to relocate?",
          stayPreference: "Preference of stay",
          address: "What is the relocation address?",
        },
        education: {
          sevisID: "SEVIS ID",
          dsoName: "DSO Name",
          dsoEmail: "DSO Email",
          dsoPhone: "DSO Phone",
          university: {
            name: "Graduated University Name",
            passDate: "Passed month and year",
            stream: "Stream",
            address: "University Address",
          },
          certificationsList: {
            heading: "Any certifications?",
            itemLabels: {
              input: "Certificate",
            },
          },
        },
        profession: {
          training: "Training Attended?",
          expYears: "Experience in Years",
          expMonths: "Experience in Months",
          prevExpList: {
            heading: "Any past experience?",
            itemLabels: {
              employerName: "Company Name",
              email: "Company Email",
              phone: "Company Phone",
              address: "Company Address",
            },
          },
          technologyList: {
            heading: "Any familiar technologies?",
            itemLabels: { input: "Technology" },
          },
          referencesList: {
            heading: "Any references?",
            itemLabels: {
              name: "Reference Name",
              phone: "Reference Phone",
              email: "Reference Email",
              designation: "Designation",
              company: "Company",
            },
            helper: "(atleast two references are preferred)",
          },
        },
        offerLetter: {
          status: "Offer Letter Status",
          marketingName: "Marketing Name",
          designation: "Designation",
          startDate: "Start Date",
          endDate: "End Date",
          rolesAndResponsibilities: "Roles and Responsibilities",
        },
        usTravelAndStay: {
          monthYear: "Month and Year of US Entry",
          stayAddressesList: {
            label: "Stay Addresses in the US",
            helper: "(One is mandatory, can add up to 3)",
            heading: "Stay Address",
          },
        },
        emergencyContacts: {
          usaHeading: "USA",
          homeHeading:
            "Home Country (India, if applicable, or Other Countries)",
          fullName: "Full Name",
          phone: "Mobile Number",
        },
        miscellaneous: {
          remarks: "Remarks",
          notes: "Notes",
        },
      },
      buttons: {
        close: "Close",
        save: {
          default: "Save",
          next: "Save & Next",
          loading: "Saving...",
        },
      },
    },
  },

  /**
   * SPARK Module content for AI-powered resume analysis.
   */
  SPARK: {
    operations: {
      logoSuffix: "R",
      logo: "Spark",
      textarea: {
        placeholder: "Enter job description",
      },
      upload: {
        drag: "Drag & drop your resume here or ",
        browse: "browse",
      },
      select: {
        options: {
          default: "Choose a service",
          option1: "GeminiAI",
          option2: "OpenAI",
        },
      },
      actions: {
        header: "Select Actions",
        items: {
          [REVIEW]: "Overall Assessment",
          [ABOUT]: "About Resume",
          [PERCENTAGE]: "Percentage Match",
          [IMPROVE]: "Improve Resume",
          [KEYWORDS]: "Missing Keywords",
          [QUESTIONS]: "Interview Questions",
          [EXPERIENCE]: "Domain Experience",
          [SKILLS]: "Desired Skills",
          [HASHTAGS]: "Hashtags",
        },
      },
      button: {
        default: "Ready to boost ?",
        loading: "Boosting...!",
      },
      overlayMessage: {
        title1: "Elevate Your ",
        title2: "Career",
        subTitle: "AI-powered resume analysis awaits",
      },
    },
    results: {
      [REVIEW]: "Assessment",
      [ABOUT]: "About",
      [PERCENTAGE]: "Percentage Match",
      [IMPROVE]: "Improvements",
      [KEYWORDS]: "Missing Keywords",
      [QUESTIONS]: "Interview Questions",
      [EXPERIENCE]: "Domain Experience",
      [SKILLS]: "Desired Skills",
      [HASHTAGS]: "Hashtags",
    },
  },
};
