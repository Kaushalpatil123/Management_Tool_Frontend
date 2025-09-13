import './App.css'
import Dashboard from './Pages/Dashboard/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './Pages/Sidebar/Sidebar';
import MainDashboard from './Pages/Dashboard/MainDashboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <Router>
      <div className="flex">
        {/* Sidebar stays fixed */}
        <div className="w-[20%]">
          <Sidebar />
        </div>

        {/* Main content (all routes go inside MainDashboard) */}
        <div className="w-[80%]">
          <Routes>
            <Route path="/*" element={<MainDashboard />} />
          </Routes>
        </div>
      </div>

      {/* 👇 ToastContainer should be outside routes but inside Router */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  )
}

export default App


