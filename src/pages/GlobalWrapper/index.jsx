import { HelmetProvider } from "react-helmet-async";
import StatusMessage from "../../micro-frontends/Atoms/components/StatusMessage";
import ContextProvider from "../../store/ContextProvider";

/**
 * GlobalWrapper Component
 *
 * This component wraps the entire application with global providers, ensuring
 * essential context and services are available app-wide.
 *
 * - `HelmetProvider`: Provides support for dynamic document head management, such as title and meta tags.
 * - `ContextProvider`: Supplies application-wide state and context through custom React context.
 * - `StatusMessage`: Displays global status messages and notifications for user feedback.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render within the wrapper.
 * @returns {JSX.Element} The fully wrapped application component.
 */
const GlobalWrapper = ({ children }) => {
  return (
    <HelmetProvider>
      <ContextProvider>
        <StatusMessage />
        {children}
      </ContextProvider>
    </HelmetProvider>
  );
};

GlobalWrapper.displayName = "GlobalWrapper";
export default GlobalWrapper;
