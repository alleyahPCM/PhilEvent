import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import UserEvents from './pages/UserEvents';
import UserHome from './pages/UserHome';
import UserCalendar from './pages/UserCalendar';

import './App.css';

import {Routes, Route} from "react-router-dom";
import UserSettings from './pages/UserSettings';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Event from './pages/Event';
import Places from './pages/Places';

function App() {
  return (
    <div className={`App d-flex flex-column`}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Places" element={<Places/>}/>
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
