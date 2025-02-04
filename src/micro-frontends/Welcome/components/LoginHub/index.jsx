import WelcomePanel from "../WelcomePanel";
import AuthPanel from "../AuthPanel";
import Loader from "../../../Atoms/components/Loader";
import { useTargetCount } from "../../hooks";
import { END_POINTS } from "../../../../constants";
import classes from "./index.module.scss";

/**
 * LoginHub Component
 *
 * Responsible for rendering the login page. It displays a loading indicator while fetching
 * the target counts (using the `useTargetCount` hook) and then shows the welcome panel and authentication panel.
 *
 * @returns {JSX.Element} The LoginHub component containing either a Loader (while fetching) or the login page content.
 */
const LoginHub = () => {
  // Fetch target count and loading state using the custom hook
  const { targetCount: insightCount, isLoading: isInsightCountLoading } =
    useTargetCount(END_POINTS.WELCOME.FETCH_INSIGHT_COUNT);
  const { targetCount: onboardCount, isLoading: isOnboardCountLoading } =
    useTargetCount(END_POINTS.WELCOME.FETCH_ONBOARD_COUNT);
  const { targetCount: questCount, isLoading: isQuestCountLoading } =
    useTargetCount(END_POINTS.WELCOME.FETCH_QUEST_COUNT);
  const { targetCount: salesCount, isLoading: isSalesCountLoading } =
    useTargetCount(END_POINTS.WELCOME.FETCH_SALES_COUNT);
  const { targetCount: recruitCount, isLoading: isRecruitCountLoading } =
    useTargetCount(END_POINTS.WELCOME.FETCH_RECRUIT_COUNT);

  // Render loader while fetching data, then render panels
  return isInsightCountLoading ||
    isOnboardCountLoading ||
    isQuestCountLoading ||
    isSalesCountLoading ||
    isRecruitCountLoading ? (
    <Loader />
  ) : (
    <div className={classes.loginHub}>
      <WelcomePanel
        insightCount={insightCount.resume_count}
        onboardCount={onboardCount.candidates_count}
        questCount={questCount.i_count}
        salesCount={salesCount.sales_count}
        recruitCount={recruitCount.Recruit_count}
      />
      <AuthPanel />
    </div>
  );
};

LoginHub.displayName = "LoginHub";
export default LoginHub;
