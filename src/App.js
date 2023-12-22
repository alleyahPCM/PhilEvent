import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import UserHome from './pages/UserHome';

import './App.css';

import {Routes, Route} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Event from './pages/Event';
import Places from './pages/Places';
import Search from './pages/Search';
import Users from './pages/Users';

function App() {
  return (
    <div className={`App d-flex flex-column`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Places" element={<Places />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/UserHome" element={<UserHome />} />
        <Route path="/Calendar" element={<UserHome />} />
        <Route path="/MyEvents" element={<UserHome />} />
        <Route path="/Settings" element={<UserHome />} />
        <Route path="/Event/:id" element={<Event />} />
        <Route path="/Users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
