import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./App";
import { UserContext } from "./UserContext";
// import { apiBaseUrl } from "./config";
import Theme from "./Theme";

const AppWithContext = () => {
  const localStorageToken = localStorage.getItem("food-feed-token");
  const currentUserId = localStorage.getItem("food-feed-userId");
  const [authToken, setAuthToken] = useState(localStorageToken);
  const [needLogin, setNeedLogin] = useState(!localStorageToken);
  const [userId, setUserId] = useState(currentUserId);

  const signIn = (token, id) => {
    window.localStorage.setItem("food-feed-token", token);
    window.localStorage.setItem("food-feed-userId", id);
    setAuthToken(token);
    setUserId(id);
    setNeedLogin(false);
  };

  const logOut = () => {
    window.localStorage.removeItem("food-feed-token");
    window.localStorage.removeItem("food-feed-userId");
    setAuthToken(localStorageToken);
    setUserId(currentUserId);
    setNeedLogin(!localStorageToken);
    window.location.href = "/";
  };

  return (
    <Theme>
      <CssBaseline>
        <UserContext.Provider
          value={{ authToken, userId, needLogin, signIn, logOut }}
        >
          <App />
        </UserContext.Provider>
      </CssBaseline>
    </Theme>
  );
};

export default AppWithContext;
