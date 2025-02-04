import { useEffect } from "react";
import PropTypes from "prop-types";
import MainNavigation from "../../micro-frontends/Atoms/components/MainNavigation";
import { useStatus, useUI } from "../../store";
import { setUpdateStatus } from "../../micro-frontends/Quest/middleware";
import { fetchUsernames } from "../../utilities";
import { END_POINTS, STATUS_CODES } from "../../constants";

/**
 * ProtectedWrapper Component
 *
 * This component wraps protected content, providing a consistent layout for
 * authenticated users. It includes a main navigation bar for easy access to
 * various sections of the application and displays any child content passed to it.
 *
 * @param {Object} props - The component props.
 * @param {JSX.Element | JSX.Element[]} props.children - The content to display within the protected layout.
 * @returns {JSX.Element} A component that displays a navigation bar along with protected child content.
 */
const ProtectedWrapper = ({ children }) => {
  const { updateStatus } = useStatus();
  const { updateUsernames } = useUI();

  useEffect(() => {
    /**
     * Provide the updateStatus function to the middleware
     */
    setUpdateStatus(updateStatus);
  }, [updateStatus]);

  useEffect(() => {
    /**
     * Fetch the available usernames
     */
    const getUsernames = async () => {
      const { status, data } = await fetchUsernames(
        END_POINTS.WELCOME.FETCH_USERNAMES
      );

      if (status === STATUS_CODES.SUCCESS) {
        updateUsernames(data);
      }
    };

    getUsernames();
  }, [updateUsernames]);

  return (
    <>
      <MainNavigation />
      {children}
    </>
  );
};

ProtectedWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ProtectedWrapper.displayName = "ProtectedWrapper";
export default ProtectedWrapper;
