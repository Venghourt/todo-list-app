import { useState } from 'react';
import Sidebar from './Components/slidebar.jsx';
import Today from "./pages/today.jsx";
import Filter from "./pages/filter.jsx";
import Upcoming from "./pages/upcoming.jsx"
import Notifications from './pages/notification.jsx';
import Search from './pages/search.jsx';
import Complete from './pages/complete.jsx'
import Profile from './pages/profile.jsx'
import { Navigate } from 'react-router-dom';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './app.css';
import { profile } from './data.js';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const Layout = () => {
    return (
      <div>
        <Sidebar/>
        <div className="main-content">
          <Outlet /> {/* This renders the child routes */}
        </div>
      </div>
    );
  };
  return (
    <Router>
      <Routes>
        <Route element={<Layout sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />}>
          <Route path="/" element={<Profile/>} />
          <Route path="/search" element={<Search />}></Route>
          <Route path="/notification" element={<Notifications />}></Route>
          <Route path="/calender" element={<Today className="dashboard" />}></Route>
          <Route path="/upcoming" element={<Upcoming />}></Route>
          <Route path="/complete" element={<Complete />}></Route>
          <Route path="/filter" element={<Filter />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
