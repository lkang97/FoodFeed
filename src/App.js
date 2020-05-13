import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ProtectedRoute } from "./Routes";
import { UserContext } from "./UserContext";

import Splash from "./components/Splash";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";
import MainFeed from "./components/MainFeed";
import Profile from "./components/Profile";

const App = () => {
  const { needLogin } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Splash}></Route>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/signup" component={SignUpForm}></Route>
        <Route path="/main" component={MainFeed}></Route>
        <Route path="/users/:id" component={Profile}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
