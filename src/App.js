import React, { useContext } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { ProtectedRoute, AuthRoute } from "./Routes";
import { UserContext } from "./UserContext";

import Splash from "./components/Splash";
// import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";
import MainFeed from "./components/MainFeed";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";

const App = () => {
  const { needLogin, userId } = useContext(UserContext);
  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <Switch>
        <AuthRoute
          exact={true}
          path="/"
          currentUserId={userId}
          component={Splash}
        ></AuthRoute>
        {/* <AuthRoute
          path="/login"
          currentUserId={userId}
          component={LoginForm}
        ></AuthRoute> */}
        <AuthRoute
          path="/signup"
          currentUserId={userId}
          component={SignUpForm}
        ></AuthRoute>
        <ProtectedRoute
          // needLogin={needLogin}
          exact={true}
          path="/main"
          component={MainFeed}
        ></ProtectedRoute>
        <ProtectedRoute
          exact={true}
          path="/users/:id"
          needLogin={needLogin}
          component={Profile}
        ></ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
