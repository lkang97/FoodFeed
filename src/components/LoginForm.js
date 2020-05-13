import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { UserContext } from "../UserContext";
import { apiBaseUrl } from "../config";

const LoginForm = () => {
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
      const { token, id } = await response.json();
      setLoggedIn(true);
      signIn(token, id);
    }
  };

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  if (loggedIn) return <Redirect to="/main" />;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button className="form-buttons" type="submit">
          Log In
        </button>
        <button className="form-buttons">Demo Log In</button>
        <div>
          <a href="/signup">Don't have an account? Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
