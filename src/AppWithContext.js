import React, { useState } from "react";
import App from "./App";
import { UserContext } from "./UserContext";
import { apiBaseUrl } from "./config";

const AppWithContext = () => {
  const localStorageToken = localStorage.getItem("food-feed-token");
  const [authToken, setAuthToken] = useState(localStorageToken);
  const [needLogin, setNeedLogin] = useState(!localStorageToken);
  const [userId, setUserId] = useState();

  const signIn = (token, id) => {
    window.localStorage.setItem("food-feed-token", token);
    setAuthToken(token);
    setUserId(id);
    setNeedLogin(false);
  };

  return (
    <UserContext.Provider value={{ authToken, userId, needLogin, signIn }}>
      <App />
    </UserContext.Provider>
  );
};

export default AppWithContext;
