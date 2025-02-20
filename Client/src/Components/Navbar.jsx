import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
const Navbar = () => {
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);
  const navigate = useNavigate();
  const sendVerificationOtp = async () => {
    try {
      // for send cookies
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <div className="flex flex-row">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-22 sm:w-70"
          onClick={() => navigate("/")}
        />
        {/* start */}
        <div className="w-22 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          Trending
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              <li
                onClick={() => navigate("/problem-of-week")}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
              >
                Problem of the Week
              </li>

              <li
                onClick={() => navigate("/leaderboards")}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                LeaderBorads
              </li>
            </ul>
          </div>
        </div>
        {/* end */}
      </div>
      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                >
                  Verify Email
                </li>
              )}
              <li
                onClick={() => navigate("/register-complaint")}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Register Complaint
              </li>
              <li
                onClick={() => navigate("/my-complaint")}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                My Complaint
              </li>
              <li
                onClick={() => navigate("/all-complaint")}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                All Complaint
              </li>
              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all "
        >
          Login <img src={assets.arrow} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
