import React from "react";
import LoginForm from "./LoginForm";

const Splash = () => {
  return (
    <div className="splash">
      <div className="splash-img"></div>
      <div className="splash-form-container">
        <div className="splash-logo">
          <h1>FoodFeed</h1>
        </div>
        <div className="splash-form">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Splash;
