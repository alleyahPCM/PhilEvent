import React from "react";
import LoginForm from "../components/LoginForm";
import { Stack } from 'react-bootstrap';
import logo from "../img/logo_white.png";

function Login() {
  return (
    <Stack className="main-container">
      <div>
        <a href="/"><img src={logo} alt="logo-transparent" className="logo-white"/></a>
      </div>
      
      <div className="form">
        <LoginForm/>
      </div>
    </Stack>
  );
}

export default Login;

