import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({
  component: Component,
  path,
  needLogin,
  componentProps,
}) => {
  return (
    <Route
      path={path}
      render={(props) =>
        needLogin === true ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} {...componentProps} />
        )
      }
    />
  );
};
