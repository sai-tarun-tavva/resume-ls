/**
 * UI keys for different operations within the resume evaluation interface.
 * These keys represent different sections or categories of information
 * displayed to the user based on resume analysis.
 */
export const OPERATION_UI_KEYS = {
  REVIEW: "reviewResume", // Key for resume review section
  ABOUT: "aboutResume", // Key for "about resume" section
  PERCENTAGE: "percentageMatch", // Key for percentage match section
  IMPROVE: "improveResume", // Key for resume improvement section
  KEYWORDS: "missingKeywords", // Key for missing keywords section
  QUESTIONS: "interviewQuestions", // Key for interview questions section
  EXPERIENCE: "domainExperience", // Key for domain experience section
  SKILLS: "desiredSkills", // Key for desired skills section
  HASHTAGS: "hashtags", // Key for hashtags section
};

/**
 * API keys for various operations that correlate with specific API requests.
 * These keys map the UI keys to corresponding API endpoints or query parameters.
 */
export const OPERATION_API_KEYS = {
  REVIEW: "ALL", // API key for fetching all resume data
  ABOUT: "tell_me_about_resume", // API key for "about resume" section
  PERCENTAGE: "percentage_match", // API key for percentage match data
  IMPROVE: "improve_resume", // API key for resume improvement data
  KEYWORDS: "missing_keywords", // API key for missing keywords data
  QUESTIONS: "Interview Questions", // API key for interview questions
  EXPERIENCE: "Domain Experience", // API key for domain experience
  SKILLS: "Desired Skills", // API key for desired skills
  HASHTAGS: "Hashtags", // API key for hashtags
};

/**
 * Mapping of UI operation keys to their respective API operation keys.
 * Provides a link between the frontend UI sections and the backend API endpoints.
 */
export const OPERATION_UI_API_KEYS = {
  [OPERATION_UI_KEYS.REVIEW]: OPERATION_API_KEYS.REVIEW,
  [OPERATION_UI_KEYS.ABOUT]: OPERATION_API_KEYS.ABOUT,
  [OPERATION_UI_KEYS.PERCENTAGE]: OPERATION_API_KEYS.PERCENTAGE,
  [OPERATION_UI_KEYS.IMPROVE]: OPERATION_API_KEYS.IMPROVE,
  [OPERATION_UI_KEYS.KEYWORDS]: OPERATION_API_KEYS.KEYWORDS,
  [OPERATION_UI_KEYS.QUESTIONS]: OPERATION_API_KEYS.QUESTIONS,
  [OPERATION_UI_KEYS.EXPERIENCE]: OPERATION_API_KEYS.EXPERIENCE,
  [OPERATION_UI_KEYS.SKILLS]: OPERATION_API_KEYS.SKILLS,
  [OPERATION_UI_KEYS.HASHTAGS]: OPERATION_API_KEYS.HASHTAGS,
};

/**
 * Options for selecting the AI service provider. Currently includes OpenAI,
 * with placeholders for future options like GeminiAI.
 */
export const SERVICE_TYPE_OPTIONS = [
  { value: "", label: "" }, // Placeholder option
  // { value: "gemini", label: "GeminiAI" }, // Uncomment if GeminiAI becomes available
  { value: "openai", label: "OpenAI" }, // Option for OpenAI
];
