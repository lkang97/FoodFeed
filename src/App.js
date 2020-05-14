import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ProtectedRoute } from "./Routes";
// import { UserContext } from "./UserContext";

import Splash from "./components/Splash";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";
import MainFeed from "./components/MainFeed";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Splash}></Route>
        <Route path="/login" component={LoginForm}></Route>
        <Route path="/signup" component={SignUpForm}></Route>
        <ProtectedRoute path="/main" component={MainFeed}></ProtectedRoute>
        <ProtectedRoute
          exact={true}
          path="/users/:id"
          component={Profile}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/users/:id/edit"
          component={EditProfile}
        ></ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
