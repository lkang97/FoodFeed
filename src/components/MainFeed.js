import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { UserContext } from "../UserContext";
import { apiBaseUrl } from "../config";
import NavBar from "./NavBar";

const MainFeed = () => {
  return <NavBar />;
};

export default MainFeed;
