import React from "react";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { SkeletonTheme } from "react-loading-skeleton";

import {Routes, Route, useLocation} from "react-router-dom";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import Login from "./views/Login";
import Interaction from "./views/Interaction";

function App() {
  const location = useLocation();

  let backgroundClass = '';

  switch (location.pathname) {
    case '/':
      backgroundClass = 'home-background';
      break;
    case '/signup':
      backgroundClass = 'signup-background';
      break;
    case '/login':
      backgroundClass = 'login-background';
      break;
    default:
      backgroundClass = ''; // Handle unknown routes
  }

  return (
    <div className={`App d-flex flex-column ${backgroundClass}`}>
      <SkeletonTheme baseColor="#D2D4DB" highlightColor="#F9FAFC">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/interaction" element={<Interaction/>}/>
        </Routes>
      </SkeletonTheme>
    </div>
  );
}

export default App;
