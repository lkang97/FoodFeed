import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { UserContext } from "../UserContext";
import { apiBaseUrl } from "../config";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    justifySelf: "center",
    position: "relative",
  },
  formContainer: {
    border: "1px solid grey",
    boxShadow: "0px 11px 35px 2px rgba(0, 0, 0, 0.14)",
    width: "300px",
    height: "350px",
    borderRadius: "1.2em",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px",
    width: "300px",
  },
  inputFields: {
    paddingBottom: "10px",
  },
  buttonContainer: {
    padding: "5px",
  },
  button: {
    width: "200px",
  },
  title: {
    color: theme.palette.primary.main,
  },
}));

const LoginForm = () => {
  const classes = useStyles();

  const { signIn } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiBaseUrl}/users/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const {
        token,
        user: { id },
      } = await response.json();
      setLoggedIn(true);
      signIn(token, id);
      console.log(id);
    }
  };

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  if (loggedIn) return <Redirect to="/main" />;

  return (
    <div className={classes.loginContainer}>
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.title}>
            <h1>FoodFeed</h1>
          </div>
          <TextField
            className={classes.inputFields}
            color="primary"
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={updateEmail}
          ></TextField>
          <TextField
            className={classes.inputFields}
            color="primary"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={updatePassword}
          ></TextField>
          <div className={classes.buttonContainer}>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              type="submit"
            >
              Log In
            </Button>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
            >
              Demo Log In
            </Button>
          </div>
          <div>
            <a href="/signup">Don't have an account? Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
