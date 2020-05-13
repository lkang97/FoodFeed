import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { UserContext } from "../UserContext";
import { apiBaseUrl } from "../config";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputFields: {
    paddingBottom: "10px",
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
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className="splash-logo">
          <h1>FoodFeed</h1>
        </div>
        <TextField
          className={classes.inputFields}
          color="secondary"
          label="Email"
          variant="outlined"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </TextField>
        <TextField
          className={classes.inputFields}
          color="secondary"
          label="Password"
          variant="outlined"
        >
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </TextField>
        <Button
          color="primary"
          variant="contained"
          className="form-buttons"
          type="submit"
        >
          Log In
        </Button>
        <Button color="primary" variant="contained" className="form-buttons">
          Demo Log In
        </Button>
        <div>
          <a href="/signup">Don't have an account? Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
