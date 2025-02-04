import { useEffect } from "react";
import { Provider } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Operations from "../../../Atoms/components/Operations";
import SideNavigation from "../SideNavigation";
import { useUI } from "../../../../store";
import store from "../../store/store";
import { PAGES, ROUTES } from "../../../../constants";

/**
 * ForgeHub Component
 *
 * Serves as a wrapper for mapping sales-recruit with candidate-client operations.
 *
 * @returns {JSX.Element} The rendered ForgeHub component, which includes the operations UI and outlet for nested routes.
 */
const ForgeHub = () => {
  const {
    state: {
      pagination: { totalCount },
    },
  } = useUI();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.FORGE.SALES.VIEW);
  }, [navigate]);

  return (
    <Provider store={store}>
      <Operations currentPage={PAGES.FORGE} count={totalCount} />
      <SideNavigation />
      <Outlet />
    </Provider>
  );
};

ForgeHub.displayName = "ForgeHub";
export default ForgeHub;
