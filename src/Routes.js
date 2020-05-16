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

export const AuthRoute = ({
  component: Component,
  path,
  currentUserId,
  exact,
}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        currentUserId ? <Redirect to="/main" /> : <Component {...props} />
      }
    />
  );
};
