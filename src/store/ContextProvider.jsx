import LoadingContextProvider from "./LoadingContextProvider";
import StatusContextProvider from "./StatusContextProvider";
import UIContextProvider from "./UIContextProvider";

/**
 * ContextProvider Component
 *
 * This component wraps the application with necessary context providers.
 * It includes:
 * - UIContextProvider: Manages UI-related state (e.g., search term, pagination, refetch URL).
 * - StatusContextProvider: Handles status messages (e.g., success, error).
 * - LoadingContextProvider: Manages loading states for the application (e.g., loading spinners, button loading).
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the context values.
 * @returns {JSX.Element} - The wrapped children with all context providers.
 */
const ContextProvider = ({ children }) => {
  return (
    <UIContextProvider>
      <StatusContextProvider>
        <LoadingContextProvider>{children}</LoadingContextProvider>
      </StatusContextProvider>
    </UIContextProvider>
  );
};

ContextProvider.displayName = "ContextProvider";
export default ContextProvider;
