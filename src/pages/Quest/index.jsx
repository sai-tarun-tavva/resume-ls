import { Helmet } from "react-helmet-async";
import QuestHub from "../../micro-frontends/Quest/components/QuestHub";
import { CONTENT } from "../../constants";

/**
 * Quest Component
 *
 * This component serves as the main entry point for the RQuest application.
 * It includes a `Helmet` element for dynamic document head management, setting the page
 * title to "RQuest" to provide a clear and focused user experience.
 *
 * The `QuestHub` component is rendered here to display the main functionality,
 * which allows for automated interview calls, question generation based on job descriptions,
 * and potentially displays real-time AI-driven conversation with candidates.
 *
 * @component
 * @returns {JSX.Element} A component that renders the QuestHub with a custom page title.
 */
const Quest = () => {
  return (
    <>
      <Helmet>
        <title>{CONTENT.COMMON.pageTitles.quest}</title>
      </Helmet>
      <QuestHub />
    </>
  );
};

Quest.displayName = "Quest";
export default Quest;
