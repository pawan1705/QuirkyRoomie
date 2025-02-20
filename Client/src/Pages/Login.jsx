import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
  const [state, setState] = useState("sign up");
  const [name, setName] = useState("");
  const [flat, setFlat] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      // for sending cookies
      axios.defaults.withCredentials = true;
      if (state === "sign up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          flat,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/all-complaint");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center  min-h-screen px-6   sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 ">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm ">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "sign up" ? "Create  account" : "login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {" "}
          {state === "sign up"
            ? "Create your account"
            : "login to your account"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "sign up" && (
            <>
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.person} />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="bg-transparent outline-none"
                  type="text"
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.flat} />
                <input
                  onChange={(e) => setFlat(e.target.value)}
                  value={flat}
                  className="bg-transparent outline-none"
                  type="text"
                  placeholder="Flat Number"
                  required
                />
              </div>
            </>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.email} />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.password} />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            forgot password?
          </p>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900  text-white font-medium">
            {state}
          </button>
        </form>
        {state === "sign up" ? (
          <p className="text-grey-400 text-center text-xs mt-4">
            Already have an account ?{" "}
            <span
              onClick={() => setState("login")}
              className="text-blue-400 cursor-pointer underline"
            >
              {" "}
              Login here
            </span>
          </p>
        ) : (
          <p className="text-grey-400 text-center text-xs mt-4">
            Don't have an account ?{" "}
            <span
              onClick={() => setState("sign up")}
              className="text-blue-400 cursor-pointer underline"
            >
              {" "}
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
