import { useGetMeQuery } from "@/redux/features/users/users.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import Loading from "@/utils/Loading";

export const withAuth = (Component: ComponentType, authRoles: string[]) => {
  return function AuthWrapper() {
    const { data, isLoading, isFetching } = useGetMeQuery(undefined);

    // while fetching user info, show loader to avoid rendering protected UI
    if (isLoading || isFetching) {
      return <Loading />;
    }

    // not authenticated
    if (!data?.data?.email) {
      return <Navigate to="/login" replace />;
    }

    // not authorized
    if (!authRoles.includes(data?.data?.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};
