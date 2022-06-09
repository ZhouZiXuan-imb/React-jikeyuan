import React from "react";
import { isAuth } from "@/utils/token";
import { Navigate, RouteProps } from "react-router";

function Auth({ children }: RouteProps) {
  let token = isAuth();
  return <>{token ? children : <Navigate to={"/login"} />}</>;
}

export default Auth;
