import CandidatesHub from "../../components/CandidatesHub";

/**
 * Home Component
 *
 * Serves as the main entry point for the application.
 * It renders the CandidatesHub component to display the candidates' information.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
const Home = () => {
  return <CandidatesHub />;
};

Home.displayName = "Home";

export default Home;
