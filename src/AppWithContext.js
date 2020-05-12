import React, { useState } from "react";
import App from "./App";
import { UserContext } from "./UserContext";
import { apiBaseUrl } from "./config";

const AppWithContext = () => {
  const localStorageToken = localStorage.getItem("food-feed-token");
  const [authToken, setAuthToken] = useState(localStorageToken);
  const [needLogin, setNeedLogin] = useState(!localStorageToken);

  const login = (token) => {
    window.localStorage.setItem("food-feed-token", token);
    setAuthToken(token);
    setNeedLogin(false);
  };

  return (
    <UserContext.Provider value={{ authToken, needLogin, login }}>
      <App />
    </UserContext.Provider>
  );
};

export default AppWithContext;
