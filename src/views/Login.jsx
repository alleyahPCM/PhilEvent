import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import { Stack } from 'react-bootstrap';
import logo from "../img/logo_white.png";
import axios from "axios";

function Login() {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get("http://localhost:8080/")
      .then(res => {
        console.log(res)
        if (res.data.valid) {
          navigate("/interaction")
        }
      })
      .catch(err => console.log(err))
  }, [])

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

