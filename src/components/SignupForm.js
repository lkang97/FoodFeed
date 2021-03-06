import React, { useContext, useState } from "react";

import { UserContext } from "../UserContext";
import { apiBaseUrl } from "../config";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import { handleErrors } from "../utils";

const useStyles = makeStyles((theme) => ({
  signUpContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 150,
  },
  formContainer: {
    border: "1px solid grey",
    boxShadow: "0px 11px 35px 2px rgba(0, 0, 0, 0.14)",
    width: "300px",
    height: "auto",
    borderRadius: "1.2em",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px",
    width: "300px",
    paddingBottom: 20,
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

const SignUpForm = () => {
  const classes = useStyles();

  const { signIn } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userId, setUserId] = useState();

  //Grabs user information from form and sends it to create a new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username,
      email,
      password,
      profileName: "",
      imageUrl: "",
      biography: "",
    };

    try {
      debugger;
      const response = await fetch(`${apiBaseUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const {
          token,
          user: { id },
        } = await response.json();
        setUserId(id);
        setLoggedIn(true);
        signIn(token, id);
      } else {
        throw response;
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  //If everything works the page will redirect to user's profile page
  if (loggedIn) window.location.href = `/users/${userId}`;

  return (
    <div className={classes.signUpContainer}>
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.title}>
            <h1>FoodFeed</h1>
          </div>
          <div className="errors-container"></div>
          <TextField
            className={classes.inputFields}
            autoFocus
            color="primary"
            label="Username"
            variant="outlined"
            type="text"
            value={username}
            onChange={updateUsername}
          />
          <TextField
            className={classes.inputFields}
            color="primary"
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={updateEmail}
          />
          <TextField
            className={classes.inputFields}
            color="primary"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={updatePassword}
          />
          <div className={classes.buttonContainer}>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              type="submit"
            >
              Sign Up
            </Button>
          </div>
          <div>
            <a href="/">Already have an account? Log in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
