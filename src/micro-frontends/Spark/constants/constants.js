export const OPERATION_UI_KEYS = {
  REVIEW: "reviewResume",
  ABOUT: "aboutResume",
  PERCENTAGE: "percentageMatch",
  IMPROVE: "improveResume",
  KEYWORDS: "missingKeywords",
  QUESTIONS: "interviewQuestions",
  EXPERIENCE: "domainExperience",
  SKILLS: "desiredSkills",
};

export const OPERATION_API_KEYS = {
  REVIEW: "overallResume",
  ABOUT: "aboutResume",
  PERCENTAGE: "percentageMatches",
  IMPROVE: "improvementsInResume",
  KEYWORDS: "missingKeywords",
  QUESTIONS: "interviewQuestions",
  EXPERIENCE: "domainExperience",
  SKILLS: "desiredSkills",
};

export const OPERATION_API_UI_KEYS = {
  [OPERATION_API_KEYS.REVIEW]: OPERATION_UI_KEYS.REVIEW,
  [OPERATION_API_KEYS.ABOUT]: OPERATION_UI_KEYS.ABOUT,
  [OPERATION_API_KEYS.PERCENTAGE]: OPERATION_UI_KEYS.PERCENTAGE,
  [OPERATION_API_KEYS.IMPROVE]: OPERATION_UI_KEYS.IMPROVE,
  [OPERATION_API_KEYS.KEYWORDS]: OPERATION_UI_KEYS.KEYWORDS,
  [OPERATION_API_KEYS.QUESTIONS]: OPERATION_UI_KEYS.QUESTIONS,
  [OPERATION_API_KEYS.EXPERIENCE]: OPERATION_UI_KEYS.EXPERIENCE,
  [OPERATION_API_KEYS.SKILLS]: OPERATION_UI_KEYS.SKILLS,
};

export const INPUT_ACTION_TYPES = {
  TEXTAREA: "description",
  UPLOAD: "uploadedResume",
  SELECT: "selectedAI",
  CHECKBOX: "actions",
};
