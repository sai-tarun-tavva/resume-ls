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
    noCandidateRecord: "No records found.",
    searchTooltipHeader: "Searches by:",
    pageTitles: {
      welcome: "Recruit Smarter",
      insight: "Glint",
      onboard: "Hatch",
      spark: "Spark",
      forge: "Forge",
      quest: "Quest",
      nexus: "Nexus",
    },
    mainNavigation: {
      heading: "Resume Suite",
      onboard: "Hatch",
      insight: "Glint",
      spark: "Spark",
      quest: "Quest",
      forge: "Forge",
      nexus: "Nexus",
    },
    errors: {
      url: {
        empty: "URL is required.",
        invalid: "Please enter a valid URL.",
      },
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
      extension: {
        empty: "Extension is required.",
        invalid: "Extension must contain 1 to 7 digits.",
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
        invalid: "Please enter a valid date of birth. (mm/dd/yyyy)",
        tooYoung: "Candidate must be 18 years old.",
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
        invalid: "Please enter a valid state ID number.",
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
      linkedInIdentifier: {
        empty: "LinkedIn identifier is required.",
        invalid: "Please enter a valid LinkedIn identifier.",
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
      clientName: {
        empty: "Client Name is required.",
      },
      position: {
        empty: "Position is required.",
      },
      rateFrequency: {
        empty: "Rate Frequency is required.",
      },
      rate: {
        empty: "Rate is required.",
        invalid: "Rate must be a positive number.",
      },
      terms: {
        empty: "Terms are required.",
      },

      primeVendor: {
        empty: "Prime Vendor is required.",
      },
      projectImplementor: {
        empty: "Project Implementor is required.",
      },
      companyName: {
        empty: "Company Name is required.",
      },
    },
    pageNotFound: {
      title: "404",
      message:
        "It seems the candidate you were looking for got lost in cyberspace! 🚀",
      suggestionStart: "Head back to the ",
      suggestionEnd: " to find the perfect candidate!",
      suggestedPageName: "Home page",
    },
    historySideBar: {
      heading: "Status Timeline",
      statusMessages: {
        "Under Review": "Application is under review by the team.",
        "In Progress": "Processing application and verifying details.",
        Placed: "Candidate has been successfully placed.",
        Marketing: "Profile is being marketed to clients.",
        Onboarded: "Candidate has been onboarded and is ready to start.",
        "Yet To Review": "Application has been submitted but not yet reviewed.",
        Submitted:
          "Profile has been submitted to the client or vendor for review.",
        Interviewed: "Candidate has completed the interview process.",
        "No Response": "No response received from the client or vendor yet.",
        Hold: "Application has been put on hold by the client or team.",
        Selected: "Candidate has been selected for the position.",
        Rejected: "Candidate has been rejected for the role.",
      },
      icons: {
        "Under Review": "🔍",
        "In Progress": "⏳",
        "Yet To Review": "🕒",
        Placed: "🏆",
        Marketing: "📣",
        Onboarded: "✅",
        Submitted: "📤",
        Interviewed: "🎤",
        "No Response": "🚫",
        Hold: "⏸️",
        Selected: "🎯",
        Rejected: "❌",
      },
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
      heading1: "Recruit",
      heading2: "Smarter",
      subHeading: "Empowering Resumes, Elevating Careers",
      insightParagraph: "Resumes parsed",
      onboardParagraph: "Candidates onboarded",
      sparkParagraph: "Changes suggested",
      questParagraph: "Candidates interviewed",
      salesParagraph: "Profiles submitted",
      recruitParagraph: "Candidates recruited",
      footerParagraph1: "Developed by ",
      footerParagraph2: "Logisoft Technologies Inc.",
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
      logo: "Glint",
      countInfo: "Total resumes: ",
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
    candidates: {
      numberOfRecords1: "Showing ",
      numberOfRecords2: " Candidates ",
      perPage: "Per Page: ",
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
    statusMessages: {
      form: {
        success_add: "Successfully added new candidate details!",
        success_update: "Successfully updated candidate details!",
        success_update_status: "Successfully updated candidate status!",
        success_update_status_completed:
          "Successfully onboarded the candidate!",
        failure:
          "Failed to add or update candidate information. Please try again later.",
      },
    },
    operations: {
      logoSuffix: "R",
      logo: "Hatch",
      countInfo: "Total candidates: ",
      search: {
        placeholder: "Search...",
        searchFields: [
          "Status",
          "First name",
          "Last name",
          "Email",
          "Mobile",
          "City",
          "State",
          "Reference",
          "Technology",
        ],
      },
    },
    candidates: {
      columnHeaders: {
        status: "Status",
        onboardingDate: "Date",
        lastUpdated: "Last Update",
        position: "Position",
        experience: "Exp",
        companyName: "Company",
        technology: "Technology",
        name: "Full Name",
        marketingName: "M.Name",
        visaStatus: "Visa",
        city: "City",
        state: "State",
        relocation: "Reloc",
        phone: "Mobile",
        email: "Email",
        dob: "DOB",
        universityName: "University",
        offerStatus: "Offer",
        referenceName: "Referral",
        guestHouseMember: "GH",
        remarks: "Remarks",
        notes: "Notes",
      },
      noCandidates: "No candidates available",
      statusUpdateModal: {
        heading: "Action Required",
        description:
          "Complete all required sections and click 'Save' for optional sections before finalizing.",
        cancel: "Cancel",
        edit: "Edit Details",
      },
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
          date: "Date",
          status: {
            label: "Status",
            helper: "(Considered IN PROGRESS by default)",
          },
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
          licenseNumber: "License Number",
          stateIDNumber: "State ID Number",
          skypeID: "Skype ID",
          referenceName: "Reference Name",
        },
        location: {
          usaHeading: "Current Location in USA",
          haveIndian: {
            label:
              "Have any address in India (if applicable) or another country?",
            helper: "(Considered no by default)",
          },
          indiaHeading: "Address in India (if applicable) or another country",
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
          universityList: {
            heading: "Add School or University",
            itemLabels: {
              universityName: "School/University Name",
              passedMonthAndYear: "Passed month and year",
              stream: "Stream",
              address: "School/University Address",
            },
            helper: "(atleast one school/university is mandatory)",
          },
          certificationsList: {
            heading: "Any certifications?",
            itemLabels: {
              input: "Certificate",
            },
          },
        },
        profession: {
          training: {
            label: "Training Attended?",
            helper: "(Considered no by default)",
          },
          expYears: "Experience in Years",
          expMonths: "Experience in Months",
          prevExpList: {
            heading: "Add past experience",
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
          linkedInIdentifier: "LinkedIn Identifier",
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

  /**
   * QUEST Module content for assessing candidates.
   */
  QUEST: {
    statusMessages: {
      conversation:
        "We are unable to determine the call status. Please check manually.",
    },
    operations: {
      logoSuffix: "R",
      logo: "Quest",
    },
    input: {
      text: {
        placeholder: "Candidate Phone Number",
        default: "Click {{buttonName}} to initiate the call",
      },
      textarea: {
        label: "Job Description",
      },
      questions: {
        none: {
          heading: "Click Generate Questions",
          paragraph:
            "to get started on creating the perfect interview questions!",
        },
        list: {
          heading: "Generated Questions",
          paragraph:
            "These questions are tailored based on the job description you provided:",
        },
      },
      button: {
        default: "Generate Questions",
        loading: "Generating...",
      },
      callerOverlay: {
        title1: "Make a ",
        title2: "Call",
        title3: " Now",
        subTitle: "Enter the phone number and connect instantly.",
        button: {
          default: "Call ",
        },
      },
      call: {
        calling: "Calling",
        onCall: "On Call: ",
      },
      conversation: {
        callother: "Call another candidate",
        heading: "Conversation",
        ending: "The conversation has been ended.",
        callRejected: "The call was rejected. Please try again later.",
        callEndedQuickly:
          "The call was picked up but ended immediately. No conversation took place.",
        callFailed:
          "The call could not be connected due to a network or technical issue. ",
        callBusy:
          "The recipient's line is currently busy or the call was declined. Please try again later.",
        callNoAnswer:
          "The call rang but was not answered. The recipient might be unavailable at the moment. Please try again later.",
      },
    },
  },

  /**
   * FORGE Module content for sales and recruit records management.
   */
  FORGE: {
    statusMessages: {
      form: {
        success_add: "Successfully added new record!",
        success_update: "Successfully updated the record!",
        success_update_status: "Successfully updated record status!",
        success_update_status_completed: "Successfully placed the candidate!",
        failure: "Failed to add or update record. Please try again later.",
      },
    },
    operations: {
      logoSuffix: "R",
      logo: "Forge",
      countInfo: "Total records: ",
      search: {
        placeholder: "Search...",
        searchFields: {
          sales: [
            "Status",
            "Submit by",
            "Client name",
            "P.Vendor",
            "Implementor",
            "Position",
            "City",
            "State",
            "Cand first name",
            "Cand last name",
            "V.Name",
            "V.Company",
          ],
          recruit: [
            "Status",
            "Submit by",
            "Cand first name",
            "Cand last name",
            "Cand exp",
            "Cand city",
            "Cand state",
            "Cand visa",
            "Client name",
            "Position",
            "SP name",
            "SP company",
          ],
        },
      },
    },
    sideNavigation: {
      sales: "Sales",
      recruit: "Recruit",
    },
    records: {
      columnHeaders: {
        sales: {
          status: "Status",
          date: "Date",
          submittedBy: "Submit By",
          lastUpdated: "Last Update",
          candidateName: "Cand Name",
          clientName: "Client Name",
          position: "Position",
          rate: "Rate",
          terms: "Terms",
          city: "City",
          state: "State",
          vendor: "P.Vendor",
          implementor: "Implementor",
          vendorName: "V.Name",
          vendorCompany: "V.Company",
          vendorPhone: "V.Mobile",
          vendorAlternatePhone: "V.Alt Mob",
          vendorExtension: "V.Ext",
          vendorEmail: "V.Email",
          remarks: "Remarks",
        },
        recruit: {
          status: "Status",
          date: "Date",
          submittedBy: "Submit By",
          lastUpdated: "Last Update",
          candidateName: "Cand Name",
          candidatePhone: "Cand Mobile",
          candidateEmail: "Cand Email",
          candidateExp: "Cand Exp",
          candidateCity: "Cand City",
          candidateState: "Cand State",
          visaStatus: "Visa",
          clientName: "Client Name",
          position: "Position",
          rate: "Rate",
          terms: "Terms",
          employerName: "SP Name",
          employerCompany: "SP Company",
          employerPhone: "SP Mobile",
          employerAlternatePhone: "SP Alt Mob",
          employerExtension: "SP Ext",
          employerEmail: "SP Email",
          remarks: "Remarks",
        },
      },
      noCandidates: "No records available",
    },
    candidateForm: {
      sections: {
        submission: {
          date: "Date",
          by: {
            sales: "Your Name (Sales Person Name)",
            recruit: "Your Name (Recruiter Name)",
          },
        },
        candidate: {
          firstName: "First Name",
          lastName: "Last Name",
          emailId: "Email ID",
          phone: "Phone Number",
          city: "City",
          state: "State",
          visa: "Visa Status",
          expYears: "Experience in Years",
          expMonths: "Experience in Months",
        },
        requirement: {
          clientName: "Client Name",
          position: "Position",
          rateFreq: "Rate Period",
          rate: "Rate in $",
          terms: "Terms",
          city: "City",
          state: "State",
          primeVendor: "Prime Vendor",
          implementor: "Project Implementor",
        },
        vendorOrEmployer: {
          name: "Name",
          company: "Company Name",
          phone: "Phone Number",
          alternatePhone: "Alternate Phone Number",
          extension: "Extension",
          email: "Email ID",
        },
        miscellaneous: {
          remarks: "Remarks",
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
   * NEXUS Module content for displaying overview of websites.
   */
  NEXUS: {
    operations: {
      logoSuffix: "R",
      logo: "Nexus",
    },
    input: {
      urlLabel: "Type a URL",
      buttons: {
        scrape: {
          default: "Scrape",
          loading: "Scraping... ",
        },
      },
    },
    overview: {
      loader: "Analyzing website content",
      welcome: {
        heading: "Website Analysis",
        subHeading:
          "Enter a URL above to discover its structure and components",
        feature1: "Structure Analysis",
        feature2: "Component Mapping",
        feature3: "Performance Insights",
        indicator: "Start here",
      },
    },
  },
};
