import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import Operations from "../Operations";
import store from "../../store/store";

/**
 * OnboardHub Component
 *
 * Serves as a wrapper for onboarding candidate-related operations.
 * It includes the operations, add functionality, and any nested routes.
 *
 * @returns {JSX.Element} The rendered OnboardHub component.
 */
const OnboardHub = () => {
  return (
    <Provider store={store}>
      <Operations />
      <Outlet />
    </Provider>
  );
};

OnboardHub.displayName = "OnboardHub";
export default OnboardHub;
