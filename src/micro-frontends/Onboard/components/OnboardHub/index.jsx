import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import Operations from "../../../Atoms/components/Operations";
import store from "../../store/store";
import { PAGES } from "../../../../constants";

/**
 * OnboardHub Component
 *
 * Serves as a wrapper for onboarding candidate-related operations.
 * It includes the operations component for handling actions like adding new candidates,
 * and renders any nested routes for the onboarding section of the application.
 *
 * @returns {JSX.Element} The rendered OnboardHub component, which includes the operations UI and outlet for nested routes.
 */
const OnboardHub = () => {
  return (
    <Provider store={store}>
      <Operations currentPage={PAGES.ONBOARD} />
      <Outlet />
    </Provider>
  );
};

OnboardHub.displayName = "OnboardHub";
export default OnboardHub;
