/**
 * Application Routes
 *
 * Defines the main routes and route structures for various sections of the application.
 */
export const ROUTES = {
  /**
   * COMMON Routes
   *
   * Routes for common pages.
   *
   * @property {string} NOT_FOUND - Not found page for the website.
   */
  COMMON: {
    NOT_FOUND: "not-found",
  },

  /**
   * INSIGHT Routes
   *
   * Routes for the INSIGHT module, which focuses on candidate management.
   *
   * @property {string} HOME - Main page for viewing candidates.
   * @property {string} CANDIDATE_FORM - Route for editing a specific candidate.
   */
  INSIGHT: {
    HOME: "insight/candidates",
    CANDIDATE_FORM: "edit/:candidateId",
  },

  /**
   * ONBOARD Routes
   *
   * Routes for the ONBOARD module, which includes candidate creation and viewing.
   *
   * @property {string} HOME - Main page for viewing onboarded candidates.
   * @property {Object} CANDIDATE_FORM - Routes for candidate forms.
   * @property {string} CANDIDATE_FORM.NEW - Route for creating a new candidate.
   * @property {string} CANDIDATE_FORM.VIEW - Route for viewing an existing candidate by ID.
   */
  ONBOARD: {
    HOME: "onboard/candidates",
    CANDIDATE_FORM: {
      NEW: "new",
      VIEW: "view/:id",
    },
  },

  /**
   * SPARK Routes
   *
   * Routes for the SPARK module, which handles the main Spark functionalities.
   *
   * @property {string} HOME - Main page for the Spark module.
   */
  SPARK: {
    HOME: "spark",
  },

  /**
   * Quest Routes
   *
   * Routes for the QUEST module, which handles the main Quest functionalities.
   *
   * @property {string} HOME - Main page for the Quest module.
   */
  QUEST: {
    HOME: "quest",
  },
};
