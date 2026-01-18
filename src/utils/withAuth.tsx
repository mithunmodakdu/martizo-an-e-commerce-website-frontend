import { useGetMeQuery } from "@/redux/features/users/users.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, authRoles: string[]) => {
  return function AuthWrapper() {
    const {data, isLoading} = useGetMeQuery(undefined);

    if(!isLoading && !data?.data?.email ){
      return <Navigate to="/login"/>;
    }

    if(!isLoading && !authRoles.includes(data?.data?.role)){
      return <Navigate to="/unauthorized"/>;
    }

    // console.log("inside withAuth", data)
    return <Component/>;
  };
};
