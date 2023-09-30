import React from "react";
import LoginForm from "../components/LoginForm";

import logo from "../img/logo_white.png";

function Login() {
  return (
    <div className="main-container">
      <a href="/"><img src={logo} alt="logo-transparent" className="logo-white"/></a>

      <div className="form">
        <LoginForm/>
      </div>
    </div>
  );
}

export default Login;

