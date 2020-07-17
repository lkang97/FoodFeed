import React from "react";
import LoginForm from "./LoginForm";
// import splashImg from "../images/splash.png";

import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   splashContainer: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   splashImage: {
//     height: 300,
//   },
// }));

const Splash = () => {
  // const classes = useStyles();

  return (
    <div className="splash">
      {/* <div className={classes.splashImage}>
        <img className={classes.splashImage} src={splashImg} alt="splash-img" />
      </div> */}
      <LoginForm />
    </div>
  );
};

export default Splash;
