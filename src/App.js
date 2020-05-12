import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ProtectedRoute } from "./Routes";
import { UserContext } from "./UserContext";

import Splash from "./components/Splash";

const App = () => {
  const { needLogin } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Splash}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
