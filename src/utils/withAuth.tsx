import { useGetMeQuery } from "@/redux/features/users.api";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "@/utils/Loading";

export const withAuth = (Component: ComponentType, authRoles: string[]) => {
  return function AuthWrapper() {
    const location = useLocation();
    const { data, isLoading, isFetching } = useGetMeQuery(undefined);

    // while fetching user info, show loader to avoid rendering protected UI
    if (isLoading || isFetching) {
      return <Loading />;
    }

    // not authenticated that means Not logged in
    if (!data?.data?.email) {
      return <Navigate to="/login" state={{from: location}} replace />;
    }

    //Logged in but not authorized
    if (authRoles.length > 0 && !authRoles.includes(data?.data?.role)) {
      return <Navigate to="/unauthorized"  replace />;
    }

    return <Component />;
  };
};
