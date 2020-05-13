import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { UserContext } from "../UserContext";
import { apiBaseUrl } from "../config";

const SignUpForm = () => {
  const { signIn } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
    const response = await fetch(`${apiBaseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const { token, id } = await response.json();
      setLoggedIn(true);
      signIn(token, id);
    }
  };

  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  if (loggedIn) return <Redirect to="/main" />;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={updateUsername}
        />
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
          Sign Up
        </button>
        <div>
          <a href="/login">Already have an account? Log in</a>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
