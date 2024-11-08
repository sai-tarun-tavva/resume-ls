export const OPERATION_UI_KEYS = {
  REVIEW: "reviewResume",
  ABOUT: "aboutResume",
  PERCENTAGE: "percentageMatch",
  IMPROVE: "improveResume",
  KEYWORDS: "missingKeywords",
  QUESTIONS: "interviewQuestions",
  EXPERIENCE: "domainExperience",
  SKILLS: "desiredSkills",
  HASHTAGS: "hashtags",
};

export const OPERATION_API_KEYS = {
  REVIEW: "ALL",
  ABOUT: "tell_me_about_resume",
  PERCENTAGE: "percentage_match",
  IMPROVE: "improve_resume",
  KEYWORDS: "missing_keywords",
  QUESTIONS: "Interview Questions",
  EXPERIENCE: "Domain Experience",
  SKILLS: "Desired Skills",
  HASHTAGS: "Hashtags",
};

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

export const SERVICE_TYPE_OPTIONS = [
  { value: "", label: "" },
  { value: "gemini", label: "GeminiAI" },
  { value: "openai", label: "OpenAI" },
];
