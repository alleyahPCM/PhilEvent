import React from "react";
import SignUpForm from "../components/SignUpForm";

import logo from "../img/logo_white.png";

function SignUp() {
  return (
    <div className="main-container">
      <a href="/"><img src={logo} alt="logo-transparent" className="logo-white"/></a>

      <div className="form">
        <SignUpForm/>
      </div>
    </div>
  );
}

export default SignUp;

