import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  return (
    <div className=" flex flex-col items-center mt-20 px-4 text-center text-gray-900">
      <img
        src={assets.colony}
        alt="header"
        className="w-86 h-86 rounded-full  mb-6"
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey ! {userData ? userData.name : "Flatmates"}
        <img className="w-9 aspect-square" src={assets.wave} alt="" />
      </h1>
      <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
        Welcome to our Society
      </h2>
      <p className="mb-3 max-w-mid ">
        We ensure you a unique space to stay that gives you a homey feeling away
        from your original home.
      </p>
      <p className="mb-3 max-w-mid ">
        {" "}
        Just make the best choice of picking one apartment and get millions of
        dollars of happiness. Become the owner of your dream place in a minute.
      </p>
      <button
        onClick={() => navigate("/leaderboards")}
        className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all "
      >
        Leaderboards & Stats
      </button>
    </div>
  );
};

export default Header;
