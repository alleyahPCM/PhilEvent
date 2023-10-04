import React from "react";
import SignUpForm from "../components/SignUpForm";
import { Stack } from 'react-bootstrap';
import logo from "../img/logo_white.png";

function SignUp() {
  return (
    <Stack className="main-container">
      <div>
        <a href="/"><img src={logo} alt="logo-transparent" className="logo-white"/></a>
      </div>
  

      <div className="form">
        <SignUpForm/>
      </div>
    </Stack>
  );
}

export default SignUp;

