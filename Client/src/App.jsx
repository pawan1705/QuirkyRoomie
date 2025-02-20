import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import EmailVerify from "./Pages/EmailVerify";
import ResetPassword from "./Pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import ComplaintPage from "./Pages/ComplaintPage";
import AllComplaint from "./Pages/AllComplaint";
import MyComplaint from "./Pages/MyComplaint";
import RegisterComplaint from "./Pages/RegisterComplaint";
import Navbar from "./Components/Navbar";
import LeaderBoards from "./Pages/LeaderBoards";
import ProblemWeek from "./Pages/ProblemWeek";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/complaint" element={<ComplaintPage />} />
        <Route path="/register-complaint" element={<RegisterComplaint />} />
        <Route path="/all-complaint" element={<AllComplaint />} />
        <Route path="/my-complaint" element={<MyComplaint />} />
        <Route path="/leaderboards" element={<LeaderBoards />} />
        <Route path="/problem-of-week" element={<ProblemWeek />} />
      </Routes>
    </div>
  );
};

export default App;
