import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import UserEvents from './pages/UserEvents';
import UserHome from './pages/UserHome';
import UserCalendar from './pages/UserCalendar';

import './App.css';

import {Routes, Route, useLocation} from "react-router-dom";
import UserSettings from './pages/UserSettings';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Event from './pages/Event';

function App() {
  const location = useLocation();

  let backgroundClass = '';

  switch (location.pathname) {
    case '/':
      backgroundClass = 'home-background';
      break;
    case '/Signup':
      backgroundClass = 'signup-background';
      break;
    case '/Login':
      backgroundClass = 'login-background';
      break;
    default:
      backgroundClass = ''; // Handle unknown routes
  }


  return (
    <div className={`App d-flex flex-column ${backgroundClass}`}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/UserHome" element={<UserHome/>}/>
        <Route path="/Calendar" element={<UserCalendar/>}/>
        <Route path="/MyEvents" element={<UserEvents/>}/>
        <Route path="/Settings" element={<UserSettings/>}/>
        <Route path="/Event/:id" element={<Event/>}/>
      </Routes>
    </div>
  );
}

export default App;
