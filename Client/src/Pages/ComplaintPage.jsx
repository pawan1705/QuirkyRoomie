import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
const ComplaintPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center  min-h-screen px-6   sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 ">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm ">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          Register Complaint
        </h2>
        <p className="text-center text-sm mb-6">Create a Complaint</p>
        <form></form>
      </div>
    </div>
  );
};

export default ComplaintPage;
